import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRelation } from './entity/userRelation.entity';
import CommonException from '../../utils/common.exception';
import { User } from '../user/entity/user.entity';
import { Like } from 'typeorm';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(UserRelation) private readonly relationRepository,
    @InjectRepository(User) private readonly userRepository,
  ) {}
  // 查询好友信息
  async getFriends(userId, username = '') {
    const relations = await this.relationRepository
      .createQueryBuilder('relation')
      .leftJoinAndSelect(User, 'user', 'user.id = relation.userId')
      .where('user.id = :id', { id: userId })
      .getMany();

    const friendIds = relations.map(item => item.friendId);
    const users = [];
    for (const id of friendIds) {
      const user = await this.userRepository.findOne({
        id,
        username: Like(`%${username}%`),
      });
      if (user) {
        delete user.password;
        users.push(user);
      }
    }
    return users;
  }
  // 是否是好友
  async checkIsFriend(userId, friendId) {
    if (userId === friendId) {
      throw new CommonException('不能添加/删除自己');
    }

    const isFriendExist = await this.userRepository.findOne({ id: friendId });
    if (!isFriendExist) throw new CommonException('该用户不存在');

    // 检查是否已经加过好友
    const relation1 = await this.relationRepository.findOne({
      userId: userId,
      friendId: friendId,
    });
    const relation2 = await this.relationRepository.findOne({
      userId: friendId,
      friendId: userId,
    });
    return relation1 || relation2 ? true : false;
  }

  async addFriend(userId, friendId) {
    const isFriend = await this.checkIsFriend(userId, friendId);
    if (isFriend) {
      throw new CommonException('已经是好友');
    }

    await this.relationRepository.save({ userId: userId, friendId: friendId });
    await this.relationRepository.save({ userId: friendId, friendId: userId });
    return null;
  }
  async deleteFriend(userId, friendId) {
    const isFriend = await this.checkIsFriend(userId, friendId);
    if (!isFriend) {
      throw new CommonException('已经不是好友');
    }

    await this.relationRepository.delete({
      userId: userId,
      friendId: friendId,
    });
    await this.relationRepository.delete({
      userId: friendId,
      friendId: userId,
    });
  }
}
