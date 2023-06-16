import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductPdv } from '../entities/product-pdv.entity';

@Injectable()
export class ProductImplRepository implements ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  create = async (data: CreateProductDto): Promise<Product> =>
    await this._save(this.productRepository.create(data));

  findAll = async (): Promise<Product[]> =>
    await this.productRepository.find({
      relations: {
        productMainProduct: true,
        subProducts: true,
      },
    });

  findOne = async (id: string): Promise<Product> =>
    await this.productRepository.findOne({
      where: { id },
      relations: {
        productMainProduct: true,
        subProducts: true,
        productPdv: { pdvs: true },
      },
    });

  // +--------------------------------+
  // |  Private Encapsulated Methods  |
  // +--------------------------------+

  private async _save(data: any): Promise<Product> {
    return await this.productRepository.save(data);
  }
}
