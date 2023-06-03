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

  findAll = async (rel: boolean): Promise<Brand[]> => await this.brandRepo.find(rel);

  findOne = async (id: string, rel: boolean) => await this.brandRepo.findOne(id, rel);

  update = async (id: string, data: UpdateBrandDto) =>
    await this.brandRepo.update(id, data);

  remove = async (id: string) => await this.brandRepo.delete(id);
}
