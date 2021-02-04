import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { secretKey } from '../../constants';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: secretKey,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
