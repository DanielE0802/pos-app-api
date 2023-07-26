import { Module } from '@nestjs/common';
import { PdvService } from './pdv.service';
import { PdvController } from './pdv.controller';
import { PdvProviders } from './providers/pdv.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pdv } from './entities/pdv.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtConfig } from 'src/common/config/jwt.config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: JwtConfig.strategy }),
    TypeOrmModule.forFeature([Pdv]),
  ],
  controllers: [PdvController],
  providers: [PdvService, ...PdvProviders],
  exports: [PdvService],
})
export class PdvModule {}
