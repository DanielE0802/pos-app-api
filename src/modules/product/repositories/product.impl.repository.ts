import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductImplRepository implements ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  create = async (data: any): Promise<Product> =>
    await this._save(this.productRepository.create({ ...data }));

  getProducts = async (): Promise<Product[]> =>
    await this.productRepository.find({
      relations: {
        productMainProduct: true,
        subProducts: true,
      },
    });

  getProduct = async (id: string): Promise<Product> =>
    await this.productRepository.findOne({
      where: { id },
      relations: {
        productMainProduct: true,
        subProducts: true,
      },
    });

  // +--------------------------------+
  // |  Private Encapsulated Methods  |
  // +--------------------------------+

  private async _save(data: any): Promise<Product> {
    return await this.productRepository.save(data);
  }
}
