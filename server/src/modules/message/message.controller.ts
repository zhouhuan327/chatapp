import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { GroupMessageDto } from './dto/groupMessage.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Get('group')
  async getGroupMessage(@Query('groupId') groupId) {
    return this.messageService.getGroupMessage(groupId);
  }

  @Post('send')
  async groupTest(@Body() body: GroupMessageDto) {
    const { userId, groupId, content, type } = body;
    return this.messageService.sendGroupMessage(userId, groupId, content, type);
  }
}
