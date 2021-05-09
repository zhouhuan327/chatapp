import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendMessage } from './entity/friendMessage.entity';
import { Repository } from 'typeorm';
import { GroupMessage } from './entity/groupMessage.entity';
import { UserService } from '../user/user.service';
import CommonException from '../../utils/common.exception';
import { GroupService } from '../group/group.service';
import * as moment from 'moment';
import { formatTime, genRoomId, getTimeDiff } from '../../utils';
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
  // 最近聊天的群/好友
  async getRecentMessageList(userId) {
    const recentChatUser = await this.getRecentChatUser(userId);
    const recentChatGroup = await this.groupService.getRecentChatGroup(userId);
    const all = recentChatUser.concat(recentChatGroup);
    const recentChat = all
      .sort((a: any, b: any) => {
        return moment(a.time).isAfter(b.time) ? -1 : 0;
      })
      .map((item, index) => {
        item._id = index;
        item.time = getTimeDiff(item.time);
        return item;
      });
    return recentChat;
  }
  // 查询我发给好友的/好友发给我的 消息
  async getFriendMessage(userId, friendId) {
    return this.friendMessageRepository
      .createQueryBuilder('msg')
      .orderBy('msg.createTime', 'ASC')
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
  }
  async getRecentChatUser(userId) {
    // 查询和用户有关的消息
    const message = await this.friendMessageRepository
      .createQueryBuilder('msg')
      .orderBy('msg.createTime', 'DESC')
      .leftJoinAndSelect('msg.sender', 'sender')
      .leftJoinAndSelect('msg.receiver', 'receiver')
      .where('sender.id = :userId OR receiver.id = :userId', { userId })
      .getMany();
    // 去重,获得发送/接收到的 的最新消息
    const res = [];
    const map = new Map();
    for (const item of message) {
      const id = genRoomId(item.sender.id, item.receiver.id);
      if (!map.has(id)) {
        map.set(id, item.id);
        res.push(item);
      }
    }
    const recentChatUser = res.map(item => {
      // 判断一下sender和receiver哪个是好友
      const friend = item.sender.id === userId ? item.receiver : item.sender;
      const obj: RecentChat = {
        id: friend.id,
        avatarSrc: friend.avatarSrc,
        name: friend.username,
        intro: friend.intro,
        content: item.content,
        contentType: item.type,
        time: formatTime(item.createTime),
        type: 'friend',
        unreadCount: 0,
      };
      return obj;
    });
    return recentChatUser;
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
      .orderBy('msg.createTime', 'ASC')
      .leftJoinAndSelect('msg.user', 'user')
      .where('msg.group.id = :id', { id: groupId })
      .getMany();

    return messages;
  }
  async sendGroupMessage({ senderId, groupId, content = '', type = 'text' }) {
    const group = await this.groupService.getGroupById(groupId);
    if (!group) throw new CommonException('该群不存在');
    const user = await this.userService.getUserById(senderId);
    if (!user) throw new CommonException('该用户不存在');
    const message = new GroupMessage();
    message.user = user;
    message.group = group;
    message.content = content;
    message.type = type;
    return this.groupMessageRepository.save(message);
  }

  async getFriendMessages() {
    return this.friendMessageRepository.find();
  }
  async getGroupMessages() {
    return this.groupMessageRepository.find();
  }
}
