import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { UtilsModule } from '../utils/utils.module';

@Module({
  providers: [FileService],
  imports: [UtilsModule],
  exports: [FileService],
})
export class FileModule {}
