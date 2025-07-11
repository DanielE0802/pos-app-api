import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { CompanyModule } from '../company/company.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/common/entities';
import { ProductServices } from './services';

@Module({
  imports: [CompanyModule, TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [...Object.values(ProductServices)],
})
export class ProductsModule {}
