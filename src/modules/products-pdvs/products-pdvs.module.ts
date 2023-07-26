import { Module } from '@nestjs/common';
import { ProductsPdvsService } from './products-pdvs.service';
import { ProductsPdvsController } from './products-pdvs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductPdv } from './entities/product-pdv.entity';
import { ProductsPdvsProviders } from './providers/products-pdvs.providers';
import { CompanyModule } from '../company/company.module';
import { PassportModule } from '@nestjs/passport';
import { JwtConfig } from 'src/common/config/jwt.config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: JwtConfig.strategy }),
    TypeOrmModule.forFeature([ProductPdv]),
    CompanyModule,
  ],
  controllers: [ProductsPdvsController],
  providers: [ProductsPdvsService, ...ProductsPdvsProviders],
  exports: [ProductsPdvsService],
})
export class ProductsPdvsModule {}
