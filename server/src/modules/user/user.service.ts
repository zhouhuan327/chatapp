import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Like, Repository } from 'typeorm';
import CommonException from '../../utils/common.exception';
import { newUserDto, updateUserDto } from './dto/user.dto';
import { formatTime } from '../../utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers() {
    return this.userRepository.find();
  }
  async getUsersByName(username) {
    console.log(Like(`%${username}%`));
    return this.userRepository.find({ username: Like(`%${username}%`) });
  }

  async getUserById(id) {
    return this.userRepository.findOne({ id });
  }
  // 默认是查不出来密码的,要加addSelect
  async getUserByName(username) {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .addSelect('user.password')
      .getOne();
  }
  async addUser(user: newUserDto) {
    const isExist = await this.getUserByName(user.username);
    if (isExist) throw new CommonException('用户名已存在');

    return this.userRepository.save(user);
  }
  async updateUser(user: updateUserDto) {
    const oldUser = await this.userRepository.findOne({ id: user.id });
    if (!oldUser) throw new CommonException('用户不存在');

    return this.userRepository.update(oldUser, user);
  }
  async deleteUser(id) {
    return this.userRepository.delete(id);
  }
  // 最近聊天的好友以及最新的一条消息
  async getRecentChatUser(userId) {
    console.log(new Date());
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.friendMessage', 'msg')
      //排除自己
      .where('user.id <> :userId', {
        userId: userId,
      })
      .andWhere('msg.senderId = :userId OR msg.receiverId = :userId', {
        userId: userId,
      })
      .getMany();
    return [];
  }
}
