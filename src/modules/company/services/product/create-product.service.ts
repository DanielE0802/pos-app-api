import { Injectable } from '@nestjs/common';
import { Product } from 'src/common/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/common/entities';
import { Repository } from 'typeorm';
import { FindCompanyByCompanyIdService } from '../company/find-company.service';
import { CreateProductDto } from '../../dtos/company-products/create-product.dto';

@Injectable()
export class CreateProductService {
  constructor(
    // @InjectRepository(Company)
    // private readonly _companyRepo: Repository<Company>,
    @InjectRepository(Product)
    private readonly _productRepo: Repository<Product>,
    private readonly _findCompanyService: FindCompanyByCompanyIdService, // TODO: Import services from Brands and Categories
  ) {}

  async execute(companyId: string, dto: CreateProductDto) {
    const { brandId, categoryId, ...productFields } = dto;

    const currentCompany = await this._findCompanyService.execute(companyId);

    // TODO: Find Brand with companyId
    // TODO: Find Category with companyId
    const [companyBrand, companyCategory] = [{ id: 1 }, { id: 1 }];

    const currentProduct = this._productRepo.create(productFields);

    currentProduct.brandId = companyBrand.id;
    currentProduct.categoryId = companyCategory.id;

    const productStored = await this._productRepo.save(currentProduct);

    return productStored;
  }
}
