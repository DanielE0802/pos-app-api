import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductPdv } from '../../products-pdvs/entities/product-pdv.entity';

@Injectable()
export class ProductImplRepository implements ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  create = async (data: CreateProductDto): Promise<Product> =>
    await this._save(this.productRepository.create(data));

  findAll = async (companyId: string): Promise<Product[]> =>
    await this.productRepository.find({
      where: { productPdv: { pdv: { company: { id: companyId } } } },
      relations: {
        productMainProduct: true,
        subProducts: true,
        productPdv: { pdv: true },
      },
    });

  findOne = async (id: string): Promise<Product> =>
    await this.productRepository.findOne({
      where: { id },
      relations: {
        productMainProduct: true,
        subProducts: true,
        productPdv: { pdv: true },
      },
    });

  // +--------------------------------+
  // |  Private Encapsulated Methods  |
  // +--------------------------------+

  private async _save(data: any): Promise<Product> {
    return await this.productRepository.save(data);
  }
}
