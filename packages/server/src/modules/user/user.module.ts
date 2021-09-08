import { Logger, Module, OnModuleInit } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./entity/user.entity";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { Repository } from "typeorm";
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule implements OnModuleInit {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}
  async onModuleInit() {
    const list = await this.userRepository.find();
    if (!list.length) {
      await this.userRepository.save({
        id: 1,
        username: "admin",
        password: "qwer",
        intro: "",
      });
      await this.userRepository.save({
        id: 2,
        username: "默认好友",
        password: "123",
        intro: "默认好友",
      });
      Logger.log("初始化管理员和他的好友...");
    }
  }
}
