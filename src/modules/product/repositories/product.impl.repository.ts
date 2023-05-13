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

  async create(data: any): Promise<Product> {
    return await this._save(this.productRepository.create({ ...data }));
  }

  async getProducts(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: {
        productMainProduct: true,
        subProducts: true,
      },
    });
  }

  async getProduct(id: string): Promise<Product> {
    return await this.productRepository.findOne({
      where: { id },
      relations: {
        productMainProduct: true,
        subProducts: true,
      },
    });
  }

  // +--------------------------------+
  // |  Private Encapsulated Methods  |
  // +--------------------------------+

  private async _save(data: any): Promise<Product> {
    return await this.productRepository.save(data);
  }
}
