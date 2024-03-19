import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { DefaultStrategy } from 'src/common/constants/app/jwt.app';
import { Pdv } from './entities/pdv.entity';
import { PdvController } from './pdv.controller';
import { PdvProviders } from './providers/pdv.provider';
import { PdvService } from './pdv.service';

@Module({
  imports: [
    PassportModule.register(DefaultStrategy),
    TypeOrmModule.forFeature([Pdv]),
  ],
  controllers: [PdvController],
  providers: [PdvService, ...PdvProviders],
  exports: [PdvService],
})
export class PdvModule {}
