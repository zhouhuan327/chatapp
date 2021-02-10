import { HttpException } from '@nestjs/common';
import { StatusCode } from '../constants';

export default class CommonException extends HttpException {
  constructor(msg: string, statusCode = StatusCode.Error) {
    super({ statusCode, message: msg }, StatusCode.Error);
  }
}
