import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entity/group.entity';
import CommonException from '../../utils/common.exception';
import { newGroupDto } from './dto/newGroup.dto';
import { Repository } from 'typeorm';
import { GroupRelation } from './entity/groupRelation.entity';
import { UserService } from '../user/user.service';
import { formatTime } from '../../utils';
@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(GroupRelation)
    private readonly relationRepository: Repository<GroupRelation>,
    private readonly userService: UserService,
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
    return this.groupRepository.save(group);
  }
  // 删除群
  async deleteGroup(id) {
    return this.groupRepository.delete({ id });
  }
  // 查询所有加入的群的信息
  async getJoinedGroups(userId, groupName = '') {
    const relations = await this.relationRepository
      .createQueryBuilder('relation')
      .leftJoinAndSelect('relation.group', 'group')
      .leftJoinAndSelect('relation.user', 'user')
      .where('user.id = :id', { id: userId })
      .andWhere('group.groupName like :groupName', {
        groupName: '%' + groupName + '%',
      })
      .getMany();
    const groups = relations.map(item => item.group);

    return groups;
  }
  async getGroupMembers(groupId) {
    return this.relationRepository
      .createQueryBuilder('relation')
      .leftJoinAndSelect('relation.user', 'user')
      .where('relation.group.id = :groupId', { groupId })
      .getMany();
  }
  // 检查是否加入了群
  async checkRelation(userId, groupId) {
    let isInGroup = false;
    const user = await this.userService.getUserById(userId);
    if (!user) throw new CommonException('用户不存在');

    const group = await this.groupRepository.findOne({ id: groupId });
    if (!group) throw new CommonException('该群不存在或已解散');

    const relation = await this.relationRepository.findOne({ user, group });
    if (relation) isInGroup = true;
    return { isInGroup, user, group };
  }
  // 加群
  async joinGroup(userId, groupId) {
    const { isInGroup, user, group } = await this.checkRelation(
      userId,
      groupId,
    );
    if (isInGroup) throw new CommonException('已加入该群');
    return this.relationRepository.save({ user, group });
  }
  // 退群
  async exitGroup(userId, groupId) {
    const group = await this.groupRepository.findOne({ id: groupId });
    if (!group) throw new CommonException('该群已解散');

    return this.relationRepository.delete({ user: { id: userId }, group });
  }
  // 最近聊天的群以及最新的一条消息
  async getRecentChatGroup(userId) {
    const groups = await this.relationRepository
      .createQueryBuilder('relation')
      .leftJoinAndSelect('relation.group', 'group')
      .leftJoinAndSelect('relation.user', 'user')
      .leftJoinAndSelect('group.groupMessage', 'msg')
      .where('user.id = :userId', { userId })
      .andWhere('msg.groupId = group.id')
      .getMany();
    const recentChatGroup = groups.map(item => {
      const group = item?.group;
      const recentGroupMessage = group?.groupMessage?.pop();
      const obj: RecentChat = {
        id: group.id,
        avatarSrc: group.avatarSrc,
        name: group.groupName,
        intro: group.intro,
        content: recentGroupMessage.content,
        contentType: recentGroupMessage.type,
        time: formatTime(recentGroupMessage.createTime),
        type: 'group',
      };
      return obj;
    });
    return recentChatGroup;
  }
}
