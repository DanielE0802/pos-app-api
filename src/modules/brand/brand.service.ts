import { Inject, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import {
  BrandRepository,
  I_BRAND_REPOSITORY,
} from './repositories/brand.repository';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(
    @Inject(I_BRAND_REPOSITORY)
    private readonly brandRepo: BrandRepository,
  ) {}

  create = async (data: CreateBrandDto) => await this.brandRepo.create(data);

  findAll = async (companyId: string, rel: boolean) =>
    await this.brandRepo.find(companyId, rel);

  findOne = async (id: string, companyId: string, rel: boolean) =>
    await this.brandRepo.findOne(id, companyId, rel);

  update = async (id: string, data: UpdateBrandDto, companyId: string) =>
    await this.brandRepo.update(id, data, companyId);

  remove = async (entity: Brand) => await this.brandRepo.delete(entity);
}
