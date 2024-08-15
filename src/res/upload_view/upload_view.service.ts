import { Injectable, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';

@Injectable()
export class UploadViewService {
    getFile(filePath: string): StreamableFile {
        const file = createReadStream(filePath);
        console.log(file);
        return new StreamableFile(file);
    }
}
