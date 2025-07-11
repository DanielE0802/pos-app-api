import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import {
  CreateProductService,
  FindProductsService,
  FindOneProductService,
} from './services';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly createProductService: CreateProductService,
    private readonly findProductsService: FindProductsService,
    private readonly findOneProductService: FindOneProductService,
  ) {}

  @Post()
  create(
    @Param('companyId') companyId: string,
    @Body() data: CreateProductDto,
  ) {
    return this.createProductService.execute(companyId, data);
  }

  @Get()
  findAll(@Param('companyId') companyId: string) {
    return this.findProductsService.execute(companyId);
  }

  @Get(':productId')
  findOne(
    @Param('companyId') companyId: string,
    @Param('productId') productId: string,
  ) {
    return this.findOneProductService.execute(companyId, productId);
  }

  // @Patch(':productId')
  // update(
  //   @Param('companyId') companyId: string,
  //   @Param('productId') productId: string,
  //   @Body() data: UpdateProductDto,
  // ) {
  //   return this.productsService.update(companyId, productId, data);
  // }

  // @Delete(':productId')
  // remove(
  //   @Param('companyId') companyId: string,
  //   @Param('productId') productId: string,
  // ) {
  //   return this.productsService.remove(companyId, productId);
  // }
}
