import { Controller, Get, Param, Res } from '@nestjs/common';
import { UploadViewService } from './upload_view.service';
import { Response } from 'express';
import { join } from 'path';

@Controller('upload')
export class UploadViewController {
  constructor(private readonly uploadService: UploadViewService) {}

  @Get('/:name')
  async getImage(@Param('name') name: string, @Res() res: Response) {
    const filePath = join(process.cwd(), 'upload/', name);
    const file = this.uploadService.getFile(filePath);
    file.getStream().pipe(res);
  }
}
