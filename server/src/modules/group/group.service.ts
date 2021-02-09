import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entity/group.entity';
import CommonException from '../../utils/common.exception';
import { newGroupDto } from './dto/newGroup.dto';
import { Like, Repository } from 'typeorm';
import { GroupRelation } from './entity/groupRelation.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(GroupRelation)
    private readonly relationRepository: Repository<GroupRelation>,
  ) {}
  async getGroupById(id) {
    return this.groupRepository.findOne({ id });
  }
  // 创建群
  async addGroup(group: newGroupDto) {
    const isExist = await this.groupRepository.findOne({
      groupName: group.groupName,
    });
    if (isExist) throw new CommonException('该群已存在');
    const newGroup = await this.groupRepository.save(group);
    return newGroup;
  }
  // 删除群
  async deleteGroup(id) {
    return this.groupRepository.delete({ id });
  }
  // 查询所有加入群的信息
  async getMyGroups(userId, groupName = '') {
    const relations = await this.relationRepository
      .createQueryBuilder('relation')
      .leftJoinAndSelect('relation.group', 'group')
      .leftJoinAndSelect('relation.user', 'user')
      .where('user.id = :id', { id: userId })
      .getMany();
    const groups = relations.map(item => item.group);

    return groups;
  }
  // 加群
  async joinGroup(userId, groupId) {
    const group = await this.groupRepository.findOne({ id: groupId });
    if (!group) throw new CommonException('该群已解散');
    const user = { id: userId };
    const isInGroup = await this.relationRepository.findOne({ user, group });
    if (isInGroup) throw new CommonException('已加入该群');
    return this.relationRepository.save({ user, group });
  }
  // 退群
  async exitGroup(userId, groupId) {
    const group = await this.groupRepository.findOne({ id: groupId });
    if (!group) throw new CommonException('该群已解散');

    return this.relationRepository.delete({ user: { id: userId }, group });
  }
}
