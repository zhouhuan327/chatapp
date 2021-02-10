import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRelation } from './entity/userRelation.entity';
import CommonException from '../../utils/common.exception';
import { UserService } from '../user/user.service';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(UserRelation) private readonly relationRepository,
    private readonly userService: UserService,
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
    return relations.map(item => item.friend);
  }
  // 检查是否已经是好友
  async checkRelation(userId, friendId) {
    let isFriend = false;
    if (userId === friendId) {
      throw new CommonException('不能添加/删除自己');
    }
    const user = await this.userService.getUserById(userId);
    const friend = await this.userService.getUserById(friendId);

    const relation1 = await this.relationRepository.findOne({
      user: user,
      friend: friend,
    });
    const relation2 = await this.relationRepository.findOne({
      user: friend,
      friend: user,
    });

    if (relation1 || relation2) {
      isFriend = true;
    }
    return { isFriend, user, friend };
  }
  async addFriend(userId, friendId) {
    const { isFriend, user, friend } = await this.checkRelation(
      userId,
      friendId,
    );
    if (isFriend)
      throw new CommonException(`你与${friend.username}已经是好友了`);

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
