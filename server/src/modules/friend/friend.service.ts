import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRelation } from './entity/userRelation.entity';
import CommonException from '../../utils/common.exception';
import { User } from '../user/entity/user.entity';

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
      .leftJoinAndSelect('relation.user', 'user')
      .leftJoinAndSelect('relation.friend', 'friend')
      .where('user.id = :id', { id: userId })
      .andWhere('friend.username like :username', {
        username: '%' + username + '%',
      })
      .getMany();
    const friends = relations.map(item => item.friend);
    return friends;
  }

  async addFriend(userId, friendId) {
    if (userId === friendId) {
      throw new CommonException('不能添加/删除自己');
    }
    const user = await this.userRepository.findOne({ id: userId });
    const friend = await this.userRepository.findOne({ id: friendId });

    if (!friend) throw new CommonException('好友不存在');

    // 检查是否已经加过好友
    const relation1 = await this.relationRepository.findOne({
      user: user,
      friend: friend,
    });
    const relation2 = await this.relationRepository.findOne({
      user: friend,
      friend: user,
    });
    if (relation1 || relation2) {
      throw new CommonException('已经是好友了');
    }

    await this.relationRepository.save({ user: user, friend: friend });
    await this.relationRepository.save({ user: friend, friend: user });
    return null;
  }
  async deleteFriend(userId, friendId) {
    await this.relationRepository.delete({
      user: { id: userId },
      friend: { id: friendId },
    });
    await this.relationRepository.delete({
      user: { id: friendId },
      friend: { id: userId },
    });
  }
}
