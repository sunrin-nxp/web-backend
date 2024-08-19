import { Module } from '@nestjs/common';
import { UploadViewService } from './upload_view.service';
import { UploadViewController } from './upload_view.controller';

@Module({
  controllers: [UploadViewController],
  providers: [UploadViewService],
})
export class UploadViewModule {}
