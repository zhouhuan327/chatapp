import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

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
}
