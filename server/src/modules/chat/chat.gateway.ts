import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { FriendMessageDto } from '../message/dto/friendMessage.dto';
import { UserService } from '../user/user.service';
import { MessageService } from '../message/message.service';
import { FriendMessage } from '../message/entity/friendMessage.entity';
import { StatusCode } from '../../constants';

@WebSocketGateway()
export class ChatGateway {
  constructor(
    private readonly userService: UserService,
    private readonly messageService: MessageService,
  ) {}
  @WebSocketServer()
  server: Server;

  // 与好友建立连接
  @SubscribeMessage('friendChatConnect')
  connectFriend(client: Socket, data) {
    const { senderId, receiverId } = data;
    const roomId = this.genRoomId(senderId, receiverId);
    client.join(roomId);
    this.server.to(roomId).emit('friendChatConnect', {
      code: StatusCode.ConnectSuccess,
      data: null,
      message: '连接成功',
    });
  }
  // 给好友发消息
  @SubscribeMessage('friendChat')
  async friendChat(client: Socket, data: FriendMessageDto) {
    const { senderId, receiverId } = data;
    const roomId = this.genRoomId(senderId, receiverId);

    try {
      await this.messageService.sendFriendMessage(data);
      this.server.to(roomId).emit('friendChat', {
        code: StatusCode.Success,
        data: data,
        message: '成功',
      });
    } catch (e) {
      this.server.to(roomId).emit('friendChat', {
        code: StatusCode.Error,
        data: null,
        message: e.toString(),
      });
    }
  }
  // 通过两个id生成一个不大会重复的固定数值
  genRoomId(senderId, receiverId) {
    const [max, min] =
      senderId > receiverId ? [senderId, receiverId] : [receiverId, senderId];
    const str = String(Math.atan2(max, min));
    return str.substring(2, 6);
  }
}
