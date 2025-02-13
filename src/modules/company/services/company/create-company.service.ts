import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from '../../dtos/company/create-company.dto';
import { Company } from '../../entities/company.entity';

@Injectable()
export class CreateCompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly _companyRepo: Repository<Company>,
    // TODO: Import FindUserByAuthId
  ) {}

  async execute(dto: CreateCompanyDto): Promise<Company> {
    const { nit } = dto;

    const existingCompany = await this._companyRepo.findOneBy({ nit });
    if (existingCompany) {
      throw new ConflictException('Una empresa con este NIT ya existe');
    }

    const company = this._companyRepo.create(dto);

    // TODO: Asing user with FindUserByAuthId

    return await this._companyRepo.save(company);
  }
}
