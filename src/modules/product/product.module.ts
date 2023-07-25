import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductProviders } from './providers/product.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CategoryModule } from '../category/category.module';
import { BrandModule } from '../brand/brand.module';
import { ProductPdv } from '../products-pdvs/entities/product-pdv.entity';
import { ProductsPdvsModule } from '../products-pdvs/products-pdvs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    CategoryModule,
    BrandModule,
    ProductsPdvsModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ...ProductProviders],
  exports: [ProductService],
})
export class ProductModule {}
