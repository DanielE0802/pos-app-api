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
    private readonly companyRepo: Repository<Company>,
  ) {}

  public create = async (data: CreateCompanyDto): Promise<Company> =>
    await this.companyRepo.save(this.companyRepo.create(data));

  public find = async (rel: boolean): Promise<Company[]> =>
    await this.companyRepo.find({
      relations: { pdvs: rel },
      cache: true,
      loadEagerRelations: true,
    });

  public findOne = async (id: string, rel: boolean = false): Promise<Company> =>
    await this.companyRepo.findOne({
      where: { id },
      relations: { pdvs: rel },
      cache: true,
      loadEagerRelations: true,
    });

  public update = async (id: string, data: UpdateCompanyDto): Promise<any> =>
    await this.companyRepo.update(id, data);

  public delete = async (id: string): Promise<Company> =>
    await this.companyRepo.remove(await this.findOne(id));
}
