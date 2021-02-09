import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { Group } from '../group/entity/group.entity';
import { UserRelation } from '../friend/entity/userRelation.entity';
import { GroupMessage } from '../message/entity/groupMessage.entity';
import { FriendMessage } from '../message/entity/friendMessage.entity';
import { GroupRelation } from '../group/entity/groupRelation.entity';
import { UserService } from '../user/user.service';
import { FriendService } from '../friend/friend.service';
import { MessageService } from '../message/message.service';
import { GroupService } from '../group/group.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserRelation,
      Group,
      GroupRelation,
      GroupMessage,
      FriendMessage,
    ]),
  ],
  providers: [
    ChatGateway,
    UserService,
    FriendService,
    MessageService,
    GroupService,
  ],
})
export class ChatModule {}
