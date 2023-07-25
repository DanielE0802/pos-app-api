import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import {
  I_PRODUCT_REPOSITORY,
  ProductRepository,
} from './repositories/product.repository';
import { Product } from './entities/product.entity';
import { ProductsPdvsService } from '../products-pdvs/products-pdvs.service';

@Injectable()
export class ProductService {
  constructor(
    @Inject(I_PRODUCT_REPOSITORY)
    private readonly productRepo: ProductRepository,
    private readonly productsPdvsService: ProductsPdvsService,
  ) {}

  create = async (data: CreateProductDto) => {
    const { productsPdvs: productPdv } = data;
    const product = await this.productRepo.create(data);

    productPdv.forEach((ppdv) => (ppdv.product = { id: product.id }));
    await this.productsPdvsService.create(productPdv);

    return this.findOne(product.id);
  };

  findAll = async (companyId: string): Promise<Product[]> =>
    await this.productRepo.findAll(companyId);

  findOne = async (id: string): Promise<Product> =>
    await this.productRepo.findOne(id);

  // update = async (id: string, data: UpdateProductDto) =>
  //   `This action updates a #${id} product`;

  // remove = (id: string) => `This action removes a #${id} product`;
}
