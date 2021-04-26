import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import File from './file.entity';
import { Repository } from 'typeorm';
@Injectable()
export class FileService {
  assetDir;
  constructor(
    @InjectRepository(File) private readonly fileRepository: Repository<File>,
  ) {
    this.assetDir = path.join(__dirname + 'assets');
  }
  async saveFileRecord(userId: number, fileName: string) {
    return await this.fileRepository.save({ userId, fileName });
  }
}
