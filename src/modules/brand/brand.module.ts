import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { BrandProviders } from './providers/brand.providers';
import { PassportModule } from '@nestjs/passport';
import { JwtConfig } from 'src/common/config/jwt.config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: JwtConfig.strategy }),
    TypeOrmModule.forFeature([Brand]),
  ],
  controllers: [BrandController],
  providers: [BrandService, ...BrandProviders],
  exports: [BrandService],
})
export class BrandModule {}
