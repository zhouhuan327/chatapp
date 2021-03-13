import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { Repository } from 'typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule implements OnModuleInit {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async onModuleInit() {
    const defaultUser = await this.userRepository.findOne({ id: 1 });
    if (!defaultUser) {
      await this.userRepository.save({
        id: 1,
        username: 'admin',
        password: 'qwer',
        intro: '是作者',
      });
      Logger.log('初始化管理员...');
    }
  }
}
