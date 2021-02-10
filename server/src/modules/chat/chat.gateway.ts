import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { FriendMessageDto } from '../message/dto/friendMessage.dto';
import { UserService } from '../user/user.service';
import { MessageService } from '../message/message.service';
import { errorResp, genRoomId, successResp } from '../../utils';
import { FriendService } from '../friend/friend.service';
import CommonException from '../../utils/common.exception';
import { GroupService } from '../group/group.service';
import { GroupMessageDto } from '../message/dto/groupMessage.dto';

@WebSocketGateway()
export class ChatGateway {
  constructor(
    private readonly userService: UserService,
    private readonly messageService: MessageService,
    private readonly friendService: FriendService,
    private readonly groupService: GroupService,
  ) {}
  @WebSocketServer()
  server: Server;

  // 与好友建立连接
  @SubscribeMessage('friendChatConnect')
  async friendChatConnect(client: Socket, data) {
    const { senderId, receiverId } = data;
    const roomId = genRoomId(senderId, receiverId);
    try {
      const { isFriend, friend } = await this.friendService.checkRelation(
        senderId,
        receiverId,
      );
      if (!isFriend)
        throw new CommonException(`你与${friend.username}不是好友关系`);

      client.join(roomId);
      this.server
        .to(roomId)
        .emit('friendChatConnect', successResp(data, '连接成功'));
    } catch (e) {
      this.server.emit('friendChatConnect', errorResp(e));
    }
  }
  // 给好友发消息
  @SubscribeMessage('friendChatMessage')
  async friendChatMessage(client: Socket, data: FriendMessageDto) {
    const { senderId, receiverId } = data;
    const roomId = genRoomId(senderId, receiverId);

    try {
      const message = await this.messageService.sendFriendMessage(data);
      this.server.to(roomId).emit('friendChatMessage', successResp(message));
    } catch (e) {
      this.server.to(roomId).emit('friendChatMessage', errorResp(e));
    }
  }
  // 与群建立连接
  @SubscribeMessage('groupChatConnect')
  async groupChatConnect(client: Socket, data) {
    const { senderId, groupId } = data;
    try {
      const { isInGroup, user, group } = await this.groupService.checkRelation(
        senderId,
        groupId,
      );
      if (!isInGroup) throw new CommonException(`未加入群${group.groupName}`);

      client.join(groupId);
      this.server
        .to(groupId)
        .emit(
          'groupChatConnect',
          successResp(data, `${user.username}加入了群聊`),
        );
    } catch (e) {
      this.server.emit('groupChatConnect', errorResp(e));
    }
  }
  // 发送群聊消息
  @SubscribeMessage('groupChatMessage')
  async groupChatMessage(client: Socket, data: GroupMessageDto) {
    const { groupId } = data;
    const roomId = groupId + '';

    try {
      const message = await this.messageService.sendGroupMessage(data);
      this.server.to(roomId).emit('groupChatMessage', successResp(message));
    } catch (e) {
      this.server.emit('groupChatMessage', errorResp(e));
    }
  }
}
