import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCompanyDto } from '../../dtos/company/update-company.dto';
import { Company } from 'src/common/entities';
import { FindCompanyByCompanyIdService } from './find-company.service';

@Injectable()
export class UpdateCompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly _companyRepo: Repository<Company>,
    private readonly _findCompanyService: FindCompanyByCompanyIdService,
  ) {}

  async execute(compnayId: string, dto: UpdateCompanyDto): Promise<Company> {
    const currentCompany = await this._findCompanyService.execute(compnayId);
    const companyUpdated = await this._companyRepo.save({
      ...currentCompany,
      ...dto,
    });

    return companyUpdated;
  }
}
