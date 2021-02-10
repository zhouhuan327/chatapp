import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { newUserDto, updateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
  @Post()
  addUser(@Body() user: newUserDto) {
    return this.userService.addUser(user);
  }

  @Patch('')
  updateUser(@Body() body: updateUserDto) {
    return this.userService.updateUser(body);
  }
  @Delete(':id')
  deleteUser(@Param('id') id) {
    return this.userService.deleteUser(id);
  }
}
