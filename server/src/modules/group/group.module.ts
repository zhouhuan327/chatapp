import { Module, OnModuleInit } from '@nestjs/common';
import { GroupService } from './group.service';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entity/group.entity';
import { GroupController } from './group.controller';
import { GroupRelation } from './entity/groupRelation.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/entity/user.entity';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Group, GroupRelation, User])],
  providers: [GroupService, UserService],
  controllers: [GroupController],
  exports: [GroupService],
})
export class GroupModule implements OnModuleInit {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(GroupRelation)
    private readonly relationRepository: Repository<GroupRelation>,
  ) {}
  async onModuleInit() {
    const defaultGroup = await this.groupRepository.findOne({ id: 1 });
    if (!defaultGroup) {
      const group = await this.groupRepository.save({
        id: 1,
        groupName: '默认群聊',
        groupManagerId: 1,
        intro: '这是默认的聊天室',
      });
      await this.relationRepository.save({ id: 1, user: { id: 1 }, group });
      console.log('初始化默认群聊...');
    }
  }
}
