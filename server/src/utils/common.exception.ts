import { HttpException } from '@nestjs/common';
import { StatusCode } from '../constants';

export default class CommonException extends HttpException {
  constructor(msg: string) {
    super({ statusCode: StatusCode.Error, message: msg }, StatusCode.Error);
  }
}
