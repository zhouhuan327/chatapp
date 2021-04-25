import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { NoAuth } from '../../decorators/noAuth';

@Controller('/file')
export class FileController {
  constructor() {}
  @NoAuth()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    console.log(file);
  }
  @Post('test')
  test() {
    return '1';
  }
}
