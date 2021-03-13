import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });
  app.setGlobalPrefix('api');
  // 开启cors
  app.enableCors();
  // 全局错误过滤器
  app.useGlobalFilters(new GlobalExceptionFilter());
  // 全局拦截器,封装返回体
  app.useGlobalInterceptors(new TransformInterceptor());
  // 全局参数校验
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3305);
}
bootstrap();
