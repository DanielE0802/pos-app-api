import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from '../entities/brand.entity';
import { BrandRepository } from './brand.repository';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';

export class BrandImplRepository implements BrandRepository {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepo: Repository<Brand>,
  ) {}

  create = async (data: CreateBrandDto): Promise<Brand> =>
    await this.brandRepo.save(this.brandRepo.create(data));

  find = async (rel: boolean): Promise<Brand[]> =>
    await this.brandRepo.find({ relations: { products: rel }, cache: true });

  findOne = async (id: string, rel: boolean): Promise<Brand> =>
    await this.brandRepo.findOne({
      where: { id },
      relations: { products: rel },
      cache: true,
    });

  update = async (id: string, data: UpdateBrandDto): Promise<any> =>
    await this.brandRepo.update(id, data);

  delete = async (id: string): Promise<Brand> =>
    await this.brandRepo.remove(await this.findOne(id, false));
}
