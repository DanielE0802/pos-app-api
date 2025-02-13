import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../../entities/company.entity';

@Injectable()
export class FindCompanyByCompanyIdService {
  private _logger = new Logger(FindCompanyByCompanyIdService.name)

  constructor(
    @InjectRepository(Company)
    private readonly _companyRepo: Repository<Company>,
  ) {}

  async execute(companyId: string): Promise<Company> {
    const company = await this._companyRepo.findOne({
      where: {
        companyId,
      },
      withDeleted: false,
    });

    this._logger.debug(`Company with companyId found ${companyId}`)
    if (!company) throw new NotFoundException('No se encontro una empresa');
    return company;
  }
}
