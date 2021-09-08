import { Body, Controller, Get, Post, Query, Req } from "@nestjs/common";
import { MessageService } from "./message.service";
import { GroupMessageDto } from "./dto/groupMessage.dto";
import { FriendMessageDto } from "./dto/friendMessage.dto";

@Controller("message")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Get("group")
  async getGroupMessage(@Query("groupId") groupId) {
    return this.messageService.getGroupMessage(groupId);
  }

  @Post("group")
  async sendGroupMsg(@Body() body: GroupMessageDto) {
    return this.messageService.sendGroupMessage(body);
  }

  @Get("friend")
  getFriendMsg(@Req() req, @Query("friendId") friendId) {
    const userId = req.user.userId;
    return this.messageService.getFriendMessage(userId, friendId);
  }

  @Post("friend")
  sendFriendMsg(@Body() body: FriendMessageDto) {
    return this.messageService.sendFriendMessage(body);
  }
  @Get("list")
  getAll(@Req() req) {
    const userId = req.user.userId;
    return this.messageService.getRecentMessageList(userId);
  }
}
