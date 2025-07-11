import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/common/entities';
import { Repository } from 'typeorm';

@Injectable()
export class FindProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly _productRepo: Repository<Product>,
  ) {}

  async execute(companyId: string) {
    // TODO: Agregar stock y demas campos
    return await this._productRepo.find({
      where: { companyId },
    });
  }
}
