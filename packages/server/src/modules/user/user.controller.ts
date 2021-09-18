import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from "@nestjs/common";
import { UserService } from "./user.service";
import { newUserDto, updateUserDto } from "./dto/user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getUsers(@Query("name") username, @Req() req) {
    if (username) {
      return this.userService.getUsersByName(username);
    } else {
      // 不传name默认查自己的信息
      return this.userService.getUserById(req.user.userId);
    }
  }
  @Get("/detail")
  getUserDetail(@Query("id") id) {
    return this.userService.getUserById(id);
  }
  @Post()
  addUser(@Body() user: newUserDto) {
    return this.userService.addUser(user);
  }

  @Patch()
  updateUser(@Body() body: updateUserDto) {
    return this.userService.updateUser(body);
  }
  @Delete(":id")
  deleteUser(@Param("id") id) {
    return this.userService.deleteUser(id);
  }
}
