import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const message = exception.message;
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      code: status,
      message,
      data: null,
    };
    // 设置返回的状态码、请求头、发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
