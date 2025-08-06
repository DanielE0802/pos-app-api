import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from 'src/common/entities';
import { Repository } from 'typeorm';
import { CreateBrandDto } from '../../dtos/company-brands/create-brand.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly _brandRepo: Repository<Brand>,
  ) {}

  async create(companyId: string, dto: CreateBrandDto) {
    const { name, description } = dto;
    const brand = this._brandRepo.create({ name, description, companyId });

    return await this._brandRepo.save(brand);
  }
}
