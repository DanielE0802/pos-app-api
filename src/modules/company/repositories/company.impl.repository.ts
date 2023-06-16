import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { Company } from '../entities/company.entity';
import { CompanyRepository } from './company.repository';

@Injectable()
export class CompanyImplRepository implements CompanyRepository {
  constructor(
    @InjectRepository(Company)
    private readonly categoryRepo: Repository<Company>,
  ) {}

  create = async (data: CreateCompanyDto): Promise<Company> =>
    await this.categoryRepo.save(this.categoryRepo.create(data));

  find = async (rel: boolean): Promise<Company[]> =>
    await this.categoryRepo.find({
      // relations: rel && RelationsCompany.findAllRelations,
      cache: true,
      loadEagerRelations: true,
    });

  findOne = async (id: string, rel: boolean): Promise<Company> =>
    await this.categoryRepo.findOne({
      where: { id },
      // relations: rel && RelationsCompany.findAllRelations,
      // cache: true,
      // loadEagerRelations: true,
    });

  update = async (id: string, data: UpdateCompanyDto): Promise<any> =>
    await this.categoryRepo.update(id, data);

  delete = async (id: string): Promise<Company> =>
    await this.categoryRepo.remove(await this.findOne(id, false));
}
