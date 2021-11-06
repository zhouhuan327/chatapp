import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";

import { Server, Socket } from "socket.io";
import { FriendMessageDto } from "../message/dto/friendMessage.dto";
import { UserService } from "../user/user.service";
import { MessageService } from "../message/message.service";
import { errorResp, genRoomId, successResp } from "../../utils";
import { FriendService } from "../friend/friend.service";
import CommonException from "../../utils/common.exception";
import { GroupService } from "../group/group.service";
import { GroupMessageDto } from "../message/dto/groupMessage.dto";
import { Logger } from "@nestjs/common";

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server; // socket 实例

  liveUserIds: Set<string>; // 在线用户的id
  constructor(
    private readonly userService: UserService,
    private readonly messageService: MessageService,
    private readonly friendService: FriendService,
    private readonly groupService: GroupService,
  ) {
    this.liveUserIds = new Set<string>();
  }

  afterInit(server: any) {
    Logger.log("socket gateway init");
  }

  handleConnection(client: any, ...args: any[]) {
    // 根据用户id给每个连上的用户分配房间 ,用于消息通知
    const id = client.handshake?.query?.userId;
    if (id) {
      client.join(id);
      this.liveUserIds.add(id);
      this.server.emit("onlineStatus", Array.from(this.liveUserIds));
      Logger.log(`id = ${id}的用户上线了`);
    }
  }

  handleDisconnect(client: any) {
    const id = client.handshake?.query?.userId;

    this.liveUserIds.delete(id);
    this.server.emit("onlineStatus", Array.from(this.liveUserIds));
    Logger.log(`id = ${id}的用户下线了`);
  }
  // 与好友建立连接
  @SubscribeMessage("friendChatConnect")
  async friendChatConnect(client: Socket, data) {
    const { senderId, receiverId } = data;
    const roomId = genRoomId(senderId, receiverId);
    try {
      const { isFriend, friend } = await this.friendService.checkRelation(senderId, receiverId);
      if (!isFriend) throw new CommonException(`你与${friend?.username}不是好友关系`);

      client.join(roomId);
      this.server.to(roomId).emit("friendChatConnect", successResp(data, "连接成功"));
    } catch (e) {
      this.server.emit("friendChatConnect", errorResp(e));
    }
  }
  // 给好友发消息
  @SubscribeMessage("friendChatMessage")
  async friendChatMessage(client: Socket, data: FriendMessageDto) {
    const { senderId, receiverId } = data;
    const roomId = genRoomId(senderId, receiverId);
    try {
      const message = await this.messageService.sendFriendMessage(data);
      // 通知正在聊天的两个人
      this.server.to(roomId).emit("friendChatMessage", successResp(message));
      // 通知对方(未在聊天)
      this.server.to(String(receiverId)).emit("notice", successResp(message));
    } catch (e) {
      this.server.to(roomId).emit("friendChatMessage", errorResp(e));
    }
  }
  // 用于消息通知
  @SubscribeMessage("notice")
  async notice(client: Socket, data) {
    return "订阅成功";
  }
  // 用于在线用户通知
  @SubscribeMessage("onlineStatus")
  async onlineStatus(client: Socket, data) {
    const id = client.handshake?.query?.userId;
    this.server.to(id).emit("onlineStatus", Array.from(this.liveUserIds));
  }

  // 与群建立连接
  @SubscribeMessage("groupChatConnect")
  async groupChatConnect(client: Socket, data) {
    const { senderId, groupId } = data;
    try {
      const { isInGroup, user, group } = await this.groupService.checkRelation(senderId, groupId);
      if (!isInGroup) throw new CommonException(`未加入群${group.groupName}`);

      client.join(groupId);
      this.server
        .to(groupId)
        .emit("groupChatConnect", successResp(data, `${user.username}加入了群聊`));
    } catch (e) {
      this.server.emit("groupChatConnect", errorResp(e));
    }
  }
  // 发送群聊消息
  @SubscribeMessage("groupChatMessage")
  async groupChatMessage(client: Socket, data: GroupMessageDto) {
    const { senderId, groupId } = data;
    const roomId = groupId + "";

    try {
      const message = await this.messageService.sendGroupMessage(data);
      // 通知在看群的人
      this.server.to(roomId).emit("groupChatMessage", successResp(message));
      // 通知不在看群但是在线的人
      await this.noticeGroupMember(senderId, groupId, successResp(message));
    } catch (e) {
      this.server.emit("groupChatMessage", errorResp(e));
    }
  }

  async noticeGroupMember(senderId, groupId, content) {
    const member = await this.groupService.getGroupMembers(groupId);
    const userIds = member.map(item => String(item?.user?.id));

    // 在线用户和群员id取交集,不包含发送者
    const liveGroupMember = userIds
      .filter(item => this.liveUserIds.has(item))
      .filter(item => item != String(senderId));
    // 通知在线的群员有新消息
    for (const i of liveGroupMember) {
      this.server.to(String(i)).emit("notice", content);
    }
  }
}
