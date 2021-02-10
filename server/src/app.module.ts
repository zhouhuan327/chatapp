import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { tokenAuthGuard } from './guards/token.guard';
import { FriendModule } from './modules/friend/friend.module';
import { MessageModule } from './modules/message/message.module';
import { GroupModule } from './modules/group/group.module';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123',
      database: 'test',
      autoLoadEntities: true,
      charset: 'utf8mb4',
      synchronize: true,
    }),
    AuthModule,
    FriendModule,
    MessageModule,
    GroupModule,
    ChatModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    //  设置全局守卫，useClass为自定义的Guard
    {
      provide: APP_GUARD,
      useClass: tokenAuthGuard,
    },
  ],
})
export class AppModule {}
