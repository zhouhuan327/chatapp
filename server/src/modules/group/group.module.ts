import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entity/group.entity';
import { GroupController } from './group.controller';
import { GroupRelation } from './entity/groupRelation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group, GroupRelation])],
  providers: [GroupService],
  controllers: [GroupController],
  exports: [GroupService],
})
export class GroupModule {}
