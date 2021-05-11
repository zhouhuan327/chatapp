import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import CommonException from '../../utils/common.exception';
import { GroupService } from '../group/group.service';
import { FriendService } from '../friend/friend.service';
import { MessageService } from '../message/message.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly groupService: GroupService,
    private readonly friendService: FriendService,
    private readonly messageService: MessageService,
  ) {}

  async validateUser(username, password): Promise<any> {
    const user = await this.userService.getUserByName(username);
    // if (!user) throw new CommonException('用户不存在');
    if (!user) {
      const newUser = {
        username,
        password,
        email: '',
        sex: '男',
        address: '',
        avatarSrc: 'default_avatar1.jpeg',
      };
      return this.register(newUser);
    }
    if (user.password !== String(password))
      throw new CommonException('密码错误');
    delete user.password;
    return user;
  }
  async login(user) {
    const payload = { id: user.id, username: user.username };
    const token = this.jwtService.sign(payload);
    return { token, user };
  }
  async register(dto) {
    const newUser = await this.userService.addUser(dto);
    await this.initUser(newUser);
    return newUser;
  }
  async initUser(user) {
    try {
      // 默认添加管理员
      await this.friendService.addFriend(user.id, 1);
      // 默认加入初始群聊
      await this.groupService.joinGroup(user.id, 1);
      // 第一条消息
      await this.messageService.sendFriendMessage({
        senderId: 1,
        receiverId: user.id,
        content: '欢迎欢迎',
      });
    } catch (e) {
      console.log('添加默认好友/群失败', e.toString());
    }
  }
}
