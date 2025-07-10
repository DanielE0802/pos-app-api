import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from 'src/common/entities';
import { FindCompanyByCompanyIdService } from './find-company.service';

@Injectable()
export class RemoveCompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly _companyRepo: Repository<Company>,
    private readonly _findCompanyService: FindCompanyByCompanyIdService,
  ) {}

  async execute(companyId: string): Promise<void> {
    const currentCompany = await this._findCompanyService.execute(companyId);
    await this._companyRepo.softRemove(currentCompany);
  }
}
