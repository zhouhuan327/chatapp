import { Module, OnModuleInit, Logger } from "@nestjs/common";
import { FriendService } from "./friend.service";
import { FriendController } from "./friend.controller";
import { TypeOrmModule, InjectRepository } from "@nestjs/typeorm";
import { UserService } from "../user/user.service";
import { User } from "../user/entity/user.entity";
import { UserRelation } from "./entity/userRelation.entity";
import { Repository } from "typeorm";
@Module({
  imports: [TypeOrmModule.forFeature([UserRelation, User])],
  providers: [FriendService, UserService],
  controllers: [FriendController],
})
export class FriendModule implements OnModuleInit {
  constructor(
    @InjectRepository(UserRelation)
    private readonly friendRepository: Repository<UserRelation>,
  ) {}
  async onModuleInit() {
    const relations: UserRelation[] = await this.friendRepository.find();
    if (!relations.length) {
      await this.friendRepository.save({
        id: 1,
        user: { id: 1 },
        friend: { id: 2 },
      });
      Logger.log("添加好友");
    }
  }
}
