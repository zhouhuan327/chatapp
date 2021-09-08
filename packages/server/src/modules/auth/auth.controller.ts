import { Controller, Get, Post, UseGuards, Request, Req, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { NoAuth } from "../../decorators/noAuth";
import { newUserDto } from "../user/dto/user.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @NoAuth()
  @UseGuards(AuthGuard("local"))
  @Post("login")
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @NoAuth()
  @Post("register")
  async register(@Body() body: newUserDto) {
    return this.authService.register(body);
  }

  @Get("checkToken")
  checkToken(@Request() req) {
    return req.user;
  }
}
