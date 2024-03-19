import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from '../company/company.module';
import { DefaultStrategy } from 'src/common/constants/app/jwt.app';
import { ProductPdv } from './entities/product-pdv.entity';
import { ProductsPdvsController } from './products-pdvs.controller';
import { ProductsPdvsProviders } from './providers/products-pdvs.providers';
import { ProductsPdvsService } from './products-pdvs.service';

@Module({
  imports: [
    PassportModule.register(DefaultStrategy),
    TypeOrmModule.forFeature([ProductPdv]),
    CompanyModule,
  ],
  controllers: [ProductsPdvsController],
  providers: [ProductsPdvsService, ...ProductsPdvsProviders],
  exports: [ProductsPdvsService],
})
export class ProductsPdvsModule {}
