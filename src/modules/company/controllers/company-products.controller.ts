import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from '../dtos/company-products/create-product.dto';
import { UpdateProductDto } from '../dtos/company-products/update-product.dto';

@Controller('companies/:companyId/products')
export class CompanyProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(
    @Param('companyId') companyId: string,
    @Body() data: CreateProductDto,
  ) {
    return this.productService.create(companyId, data);
  }

  @Get()
  findAll(@Param('companyId') companyId: string) {
    return this.productService.findAll(companyId);
  }

  @Get(':productId')
  findOne(
    @Param('companyId') companyId: string,
    @Param('productId') productId: string,
  ) {
    return this.productService.findOne(companyId, productId);
  }

  @Patch(':productId')
  update(
    @Param('companyId') companyId: string,
    @Param('productId') productId: string,
    @Body() data: UpdateProductDto,
  ) {
    return this.productService.update(companyId, productId, data);
  }

  @Delete(':productId')
  remove(
    @Param('companyId') companyId: string,
    @Param('productId') productId: string,
  ) {
    return this.productService.remove(companyId, productId);
  }
}
