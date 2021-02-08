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
  async sendFriendMessage(userId, friendId, content = '', type = 'text') {
    const isFriendExist = this.userService.getUserById(friendId);
    if (isFriendExist) throw new CommonException('该用户不存在');
    const message = new FriendMessage();
    message.senderId = userId;
    message.receiverId = friendId;
    message.content = content;
    message.type = 'text';

    return this.friendMessageRepository.save(message);
  }
  async sendGroupMessage(userId, groupId, content = '', type = 'text') {
    const group = await this.groupService.getGroupById(groupId);
    if (!group) throw new CommonException('该群不存在');
    const user = await this.userService.getUserById(userId);
    if (!user) throw new CommonException('该用户不存在');
    const message = new GroupMessage();
    message.content = content;
    message.type = 'text';
    message.user = user;
    message.group = group;
    return this.groupMessageRepository.save(message);
  }
  async getFriendMessage(userId, friendId) {
    const messages = await this.friendMessageRepository
      .createQueryBuilder('friendMessage')
      .orderBy('friendMessage.createTime', 'DESC')
      .where('groupMessage.senderId = :id', { id: userId })
      .andWhere('groupMessage.receiverId = :id', { id: friendId })
      .getMany();
    return messages;
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
}
