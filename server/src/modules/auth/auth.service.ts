import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username, password): Promise<any> {
    const user = await this.userService.getUserByName(username);
    if (!user) throw new Error('用户不存在');

    if (user.password !== String(password)) throw new Error('密码错误');

    return user;
  }

  async login(user) {
    const payload = { id: user.id, username: user.username };
    const token = this.jwtService.sign(payload);
    return { token };
  }
}
