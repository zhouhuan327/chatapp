import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { newUserDto, updateUserDto } from "./dto/user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getUsers(@Query("name") username) {
    return this.userService.getUsersByName(username);
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
