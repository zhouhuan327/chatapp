import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import CommonException from '../../utils/common.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username, password): Promise<any> {
    const user = await this.userService.getUserByName(username);
    if (!user) throw new CommonException('用户不存在');

    if (user.password !== String(password))
      throw new CommonException('密码错误');

    return user;
  }

  async login(user) {
    const payload = { id: user.id, username: user.username };
    const token = this.jwtService.sign(payload);
    return { token };
  }
  async register(dto) {
    const newUser = await this.userService.addUser(dto);
    const payload = { id: newUser.id, username: newUser.username };
    const token = this.jwtService.sign(payload);
    return { token };
  }
}
