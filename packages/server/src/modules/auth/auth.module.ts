import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entity/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { secretKey } from "../../constants";
import { PassportModule } from "@nestjs/passport";
import { UserService } from "../user/user.service";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";
import { FriendService } from "../friend/friend.service";
import { GroupService } from "../group/group.service";
import { Group } from "../group/entity/group.entity";
import { UserRelation } from "../friend/entity/userRelation.entity";
import { GroupRelation } from "../group/entity/groupRelation.entity";
import { MessageService } from "../message/message.service";
import { FriendMessage } from "../message/entity/friendMessage.entity";
import { GroupMessage } from "../message/entity/groupMessage.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserRelation,
      Group,
      GroupRelation,
      FriendMessage,
      GroupMessage,
    ]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: secretKey,
      signOptions: { expiresIn: "36000s" },
    }),
  ],
  providers: [
    AuthService,
    UserService,
    FriendService,
    GroupService,
    MessageService,
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
