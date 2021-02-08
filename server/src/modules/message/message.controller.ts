import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { MessageService } from './message.service';
import { GroupMessageDto } from './dto/groupMessage.dto';
import { FriendMessageDto } from './dto/friendMessage.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Get('group')
  async getGroupMessage(@Query('groupId') groupId) {
    return this.messageService.getGroupMessage(groupId);
  }

  @Post('group')
  async sendGroupMsg(@Body() body: GroupMessageDto) {
    const { userId, groupId, content, type } = body;
    return this.messageService.sendGroupMessage(userId, groupId, content, type);
  }

  @Get('friend')
  getFriendMsg(@Req() req, @Query('friendId') friendId) {
    const userId = req.user.userId;
    return this.messageService.getFriendMessage(userId, friendId);
  }

  @Post('friend')
  sendFriendMsg(@Body() body: FriendMessageDto) {
    const { senderId, receiverId, content, type } = body;
    return this.messageService.sendFriendMessage(
      senderId,
      receiverId,
      content,
      type,
    );
  }
}
