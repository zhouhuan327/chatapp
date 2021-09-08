import { Logger, Module, OnModuleInit } from "@nestjs/common";
import { MessageService } from "./message.service";
import { MessageController } from "./message.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FriendMessage } from "./entity/friendMessage.entity";
import { GroupMessage } from "./entity/groupMessage.entity";
import { UserService } from "../user/user.service";
import { GroupService } from "../group/group.service";
import { User } from "../user/entity/user.entity";
import { Group } from "../group/entity/group.entity";
import { GroupRelation } from "../group/entity/groupRelation.entity";

@Module({
  imports: [TypeOrmModule.forFeature([FriendMessage, GroupMessage, User, Group, GroupRelation])],
  providers: [MessageService, UserService, GroupService, MessageService],
  controllers: [MessageController],
})
export class MessageModule implements OnModuleInit {
  constructor(private readonly messageService: MessageService) {}
  async onModuleInit() {
    const firstMessages: FriendMessage[] = await this.messageService.getFriendMessages();
    if (!firstMessages.length) {
      await this.messageService.sendFriendMessage({
        senderId: 2,
        receiverId: 1,
        content: "Hello,我是你的第一个好友",
      });
    }
    const groupMessages: GroupMessage[] = await this.messageService.getGroupMessages();
    if (!groupMessages.length) {
      await this.messageService.sendGroupMessage({
        senderId: 1,
        groupId: 1,
        content: "这是默认群的第一条消息！",
      });
    }
    Logger.log("默认消息");
  }
}
