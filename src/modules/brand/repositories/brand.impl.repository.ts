import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from '../entities/brand.entity';
import { BrandRepository } from './brand.repository';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';
import { RelationsBrand } from '../relations/brand-all.relation';

export class BrandImplRepository implements BrandRepository {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepo: Repository<Brand>,
  ) {}

  create = async (data: CreateBrandDto): Promise<Brand> =>
    await this.brandRepo.save(this.brandRepo.create(data));

  find = async (companyId: string, rel: boolean): Promise<Brand[]> =>
    await this.brandRepo.find({
      where: { company: { id: companyId } },
      relations: rel && RelationsBrand.general,
      cache: true,
    });

  findOne = async (
    id: string,
    companyId: string,
    rel: boolean,
  ): Promise<Brand> =>
    await this.brandRepo.findOne({
      where: { id, company: { id: companyId } },
      relations: rel && RelationsBrand.internals,
      cache: true,
    });

  update = async (
    id: string,
    data: UpdateBrandDto,
    companyId: string,
  ): Promise<any> =>
    await this.brandRepo.update({ id, company: { id: companyId } }, data);

  delete = async (entity: Brand): Promise<Brand> =>
    await this.brandRepo.remove(entity);
}
