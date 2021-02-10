import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entity/group.entity';
import { GroupController } from './group.controller';
import { GroupRelation } from './entity/groupRelation.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group, GroupRelation, User])],
  providers: [GroupService, UserService],
  controllers: [GroupController],
  exports: [GroupService],
})
export class GroupModule {}
