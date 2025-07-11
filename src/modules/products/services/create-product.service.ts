import { Injectable } from '@nestjs/common';
import { Product } from 'src/common/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dtos/create-product.dto';

@Injectable()
export class CreateProductService {
  constructor(
    @InjectRepository(Product)
    private readonly _productRepo: Repository<Product>,
  ) {}

  async execute(companyId: string, dto: CreateProductDto) {
    const { brandId, categoryId, ...productFields } = dto;
    const currentProduct = this._productRepo.create(productFields);

    // TODO: Validar que la categoria y la marca existan en la empresa
    currentProduct.brandId = brandId;
    currentProduct.categoryId = categoryId;
    currentProduct.companyId = companyId;

    return await this._productRepo.save(currentProduct);
  }
}
