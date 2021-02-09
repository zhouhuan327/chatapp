import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendMessage } from './entity/friendMessage.entity';
import { Repository } from 'typeorm';
import { GroupMessage } from './entity/groupMessage.entity';
import { UserService } from '../user/user.service';
import CommonException from '../../utils/common.exception';
import { GroupService } from '../group/group.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(FriendMessage)
    private readonly friendMessageRepository: Repository<FriendMessage>,
    @InjectRepository(GroupMessage)
    private readonly groupMessageRepository: Repository<GroupMessage>,
    private readonly userService: UserService,
    private readonly groupService: GroupService,
  ) {}
  async getFriendMessage(userId, friendId) {
    // 查询我发给好友的/好友发给我的 消息
    const messages = await this.friendMessageRepository
      .createQueryBuilder('msg')
      .orderBy('msg.createTime', 'DESC')
      .leftJoinAndSelect('msg.sender', 'sender')
      .leftJoinAndSelect('msg.receiver', 'receiver')
      .where('sender.id = :senderId And receiver.id = :receiverId', {
        senderId: userId,
        receiverId: friendId,
      })
      .orWhere('sender.id = :receiverId And receiver.id = :senderId', {
        senderId: userId,
        receiverId: friendId,
      })
      .getMany();

    return messages;
  }
  async sendFriendMessage({
    senderId,
    receiverId,
    content = '',
    type = 'text',
  }) {
    const senderUser = await this.userService.getUserById(senderId);
    const receiverUser = await this.userService.getUserById(receiverId);

    if (!receiverUser) throw new CommonException('该用户不存在');

    const message = new FriendMessage();
    message.sender = senderUser;
    message.receiver = receiverUser;
    message.content = content;
    message.type = type;

    return this.friendMessageRepository.save(message);
  }

  async getGroupMessage(groupId) {
    const messages = await this.groupMessageRepository
      .createQueryBuilder('msg')
      .orderBy('msg.createTime', 'DESC')
      .leftJoinAndSelect('msg.user', 'user')
      .where('msg.group.id = :id', { id: groupId })
      .getMany();

    return messages;
  }
  async sendGroupMessage(userId, groupId, content = '', type = 'text') {
    const group = await this.groupService.getGroupById(groupId);
    if (!group) throw new CommonException('该群不存在');
    const user = await this.userService.getUserById(userId);
    if (!user) throw new CommonException('该用户不存在');
    const message = new GroupMessage();
    message.user = user;
    message.group = group;
    message.content = content;
    message.type = type;
    return this.groupMessageRepository.save(message);
  }
}
