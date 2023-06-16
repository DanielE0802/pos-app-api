import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  I_PRODUCT_REPOSITORY,
  ProductRepository,
} from './repositories/product.repository';
import { Product } from './entities/product.entity';
import { ProductPdv } from './entities/product-pdv.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @Inject(I_PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,

    // TODO: Separate in Provider
    @InjectRepository(ProductPdv)
    private readonly productPdvRepository: Repository<ProductPdv>,
  ) {}

  create = async (data: CreateProductDto) => {
    const { productPdv } = data;
    const product = await this.productRepository.create(data);

    productPdv.forEach((ppdv) => (ppdv.products = { id: product.id }));
    await this.productPdvRepository.save(productPdv, { chunk: 10 });

    return this.findOne(product.id);
  };

  findAll = async (): Promise<Product[]> =>
    await this.productRepository.findAll();

  findOne = async (id: string): Promise<Product> =>
    await this.productRepository.findOne(id);

  update = async (id: string, data: UpdateProductDto) =>
    `This action updates a #${id} product`;

  remove = (id: string) => `This action removes a #${id} product`;
}
