import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import CommonException from '../../utils/common.exception';
import { newUserDto, updateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers() {
    return this.userRepository.find();
  }
  async getUserByName(username: string) {
    return this.userRepository.findOne({ username });
  }
  async addUser(user: newUserDto) {
    const isExist = await this.getUserByName(user.username);
    if (isExist) throw new CommonException('用户已存在');

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
}
