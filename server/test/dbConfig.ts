import { TypeOrmModule } from '@nestjs/typeorm';

export const config = () =>
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
  });
