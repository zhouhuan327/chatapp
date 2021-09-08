import { Module } from "@nestjs/common";

import { FileController } from "./file.controller";
import { FileService } from "./file.service";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { TypeOrmModule } from "@nestjs/typeorm";
import File from "./file.entity";
@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    MulterModule.register({
      storage: diskStorage({
        //自定义路径
        destination: `./assets/upload`,
        filename: (req, file, cb) => {
          const randomName = String(Math.random()).slice(2, 8);
          const fileName = randomName + "-" + file.originalname;
          return cb(null, fileName);
        },
      }),
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
