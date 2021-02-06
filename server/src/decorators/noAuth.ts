import { SetMetadata } from '@nestjs/common';
// 标识不校验token的路由
export const NoAuth = () => SetMetadata('no-auth', true);
