import { Controller, Get, Post, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { createReadStream } from 'fs';


@Controller('files')
export class FilesController {

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      message: 'File uploaded successfully', file
    }
  }

  @Get('stream')
  streamFile(@Res() res: Response) {
    const filePath = join(__dirname, '..', 'uploads', 'sample.mp4');
    const fileStream = createReadStream(filePath);

    res.setHeader('Content-Type', 'video/mp4');
    fileStream.pipe(res);
  }
}
