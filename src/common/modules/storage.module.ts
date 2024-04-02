import { Module } from '@nestjs/common';
import { StorageService } from 'src/common/services/storage.service';

@Module({
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
