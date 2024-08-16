import { Controller, Get, Param, Res } from '@nestjs/common';
import { UploadViewService } from './upload_view.service';
import { Response } from 'express';
import { join } from 'path';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('upload')
export class UploadViewController {
  constructor(private readonly uploadService: UploadViewService) {}

  @ApiOperation({
    summary: "사진 반환",
    description: "업로드된 사진을 반환합니다."
  })
  @ApiResponse({
    status: 200,
    description: "사진"
  })
  @ApiParam({
    name: "사진 파일명",
    example: "ninejuan-profile-hjifhfdsv.png",
    description: "다운로드할 사진의w 파일명입니다.",
    type: "String"
  })
  @Get('/:name')
  async getImage(@Param('name') name: string, @Res() res: Response) {
    const filePath = join(process.cwd(), 'upload/', name);
    const file = this.uploadService.getFile(filePath);
    file.getStream().pipe(res);
  }
}
