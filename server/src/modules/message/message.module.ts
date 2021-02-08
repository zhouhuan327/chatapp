import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendMessage } from './entity/friendMessage.entity';
import { GroupMessage } from './entity/groupMessage.entity';
import { UserService } from '../user/user.service';
import { GroupService } from '../group/group.service';
import { User } from '../user/entity/user.entity';
import { Group } from '../group/entity/group.entity';
import { GroupRelation } from '../group/entity/groupRelation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FriendMessage,
      GroupMessage,
      User,
      Group,
      GroupRelation,
    ]),
  ],
  providers: [MessageService, UserService, GroupService],
  controllers: [MessageController],
})
export class MessageModule {}
