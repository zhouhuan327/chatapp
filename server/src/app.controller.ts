import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { NoAuth } from './decorators/noAuth';

@Controller()
export class AppController {
  @NoAuth()
  @Get()
  getQuery(@Req() request: Request): string {
    return `hello, service is running
     your query param: ${JSON.stringify(request.query)}`;
  }
  @NoAuth()
  @Post()
  getBody(@Req() request: Request): string {
    return `hello, service is running
     your body: ${JSON.stringify(request.body)}`;
  }
}
