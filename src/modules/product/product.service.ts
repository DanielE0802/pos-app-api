import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import {
  I_PRODUCT_REPOSITORY,
  ProductRepository,
} from './repositories/product.repository';
import { Product } from './entities/product.entity';
import { ProductsPdvsService } from '../products-pdvs/products-pdvs.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject(I_PRODUCT_REPOSITORY)
    private readonly productRepo: ProductRepository,
    private readonly productsPdvsService: ProductsPdvsService,
  ) {}

  create = async (data: CreateProductDto, companyId: string) => {
    const { productsPdvs: productPdv } = data;
    const product = await this.productRepo.create(data);

    productPdv.forEach((ppdv) => (ppdv.product = { id: product.id }));
    await this.productsPdvsService.create(productPdv);

    return this.findOne(product.id, companyId);
  };

  findAll = async (companyId: string): Promise<Product[]> =>
    await this.productRepo.findAll(companyId);

  findOne = async (
    id: string,
    companyId: string,
    rel?: boolean,
  ): Promise<Product> => await this.productRepo.findOne(id, companyId);

  update = async (id: string, data: UpdateProductDto) =>
    await this.productRepo.update(id, data);

  remove = async (entity: Product) => await this.productRepo.delete(entity);
}
