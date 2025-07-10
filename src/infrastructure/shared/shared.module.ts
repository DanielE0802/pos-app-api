import { Module, Global } from '@nestjs/common';
import { CryptoAdapter } from '../adapters/crypto.adapter';

@Global()
@Module({
  providers: [CryptoAdapter],
  exports: [CryptoAdapter],
})
export class SharedModule {}
