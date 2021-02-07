import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { User } from '../user/entity/user.entity';
import { UserRelation } from './entity/userRelation.entity';
@Module({
  imports: [TypeOrmModule.forFeature([UserRelation, User])],
  providers: [FriendService, UserService],
  controllers: [FriendController],
})
export class FriendModule {}
