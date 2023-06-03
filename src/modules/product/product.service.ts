import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  I_PRODUCT_REPOSITORY,
  ProductRepository,
} from './repositories/product.repository';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject(I_PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}

  create = async (data: CreateProductDto) =>
    await this.productRepository.create(data);

  async findAll(): Promise<Product[]> {
    return await this.productRepository.getProducts();
  }

  async findOne(id: string): Promise<Product> {
    return await this.productRepository.getProduct(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
