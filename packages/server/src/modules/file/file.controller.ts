import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileService } from "./file.service";
import { join } from "path";

import { Response } from "express";
import { NoAuth } from "../../decorators/noAuth";
@Controller("file")
export class FileController {
  constructor(private readonly fileService: FileService) {}
  @Post("upload")
  @NoAuth()
  @UseInterceptors(FileInterceptor("file"))
  uploadFile(@Req() req, @UploadedFile() file) {
    const userId = req.user?.userId;
    return this.fileService.saveFileRecord(userId, file.filename);
  }
  @Get(":name")
  @NoAuth()
  viewFile(@Param("name") name, @Res() res: Response) {
    res.sendFile(join(__dirname, "../../../assets/upload", name));
    return "下载成功";
  }
}
