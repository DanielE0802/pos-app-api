import { Inject, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import {
  CompanyRepository,
  I_COMPANY_REPOSITORY,
} from './repositories/company.repository';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @Inject(I_COMPANY_REPOSITORY)
    private readonly companyRepo: CompanyRepository,
  ) {}

  create = async (data: CreateCompanyDto) =>
    await this.companyRepo.create(data);

  findAll = async (rel: boolean): Promise<Company[]> =>
    await this.companyRepo.find(rel);

  findOne = async (id: string, rel: boolean) =>
    await this.companyRepo.findOne(id, rel);

  update = async (id: string, data: UpdateCompanyDto) =>
    await this.companyRepo.update(id, data);

  remove = async (id: string) => await this.companyRepo.delete(id);
}
