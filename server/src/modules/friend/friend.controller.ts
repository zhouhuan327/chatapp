import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { FriendService } from './friend.service';

@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Get()
  getFriends(@Req() req, @Query('username') username) {
    const userId = req.user?.userId;

    return this.friendService.getFriends(userId, username);
  }

  @Post()
  addFriend(@Body() body) {
    const { userId, friendId } = body;
    return this.friendService.addFriend(userId, friendId);
  }

  @Delete()
  deleteFriend(@Body() body) {
    const { userId, friendId } = body;
    return this.friendService.deleteFriend(userId, friendId);
  }
}
