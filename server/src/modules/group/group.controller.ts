import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { newGroupDto } from './dto/newGroup.dto';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  addGroup(@Body() body: newGroupDto) {
    return this.groupService.addGroup(body);
  }
  @Delete(':id')
  deleteGroup(@Query('id') id) {
    return this.groupService.deleteGroup(id);
  }

  @Post('/join')
  joinGroup(@Req() req, @Body() body) {
    const userId = req.user?.userId;
    const groupId = body.groupId;
    return this.groupService.joinGroup(userId, groupId);
  }
  @Post('/exit')
  exitGroup(@Req() req, @Body() body) {
    const userId = req.user?.userId;
    const groupId = body.groupId;
    return this.groupService.exitGroup(userId, groupId);
  }
  @Get()
  getGroups(@Req() req, @Query('groupName') groupName) {
    const userId = req.user?.userId;
    return this.groupService.getJoinedGroups(userId, groupName);
  }
  @Get('/members')
  getGroupMMembers(@Query('groupId') groupId) {
    return this.groupService.getGroupMembers(groupId);
  }
  @Get('/search')
  getAllGroups(@Query('name') name) {
    return this.groupService.getAllGroups(name);
  }
  @Get('/detail')
  getGroupDetail(@Query('id') id) {
    return this.groupService.getGroupById(id);
  }
}
