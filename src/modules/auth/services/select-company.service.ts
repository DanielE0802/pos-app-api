import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from 'src/modules/company/entities/company.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SelectCompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly _companyRepository: Repository<Company>,
    private readonly _jwtService: JwtService,
  ) {}

  async execute(
    companyId: number,
    userData: { userId: number; email: string },
  ) {
    const company = await this._companyRepository.findOne({
      where: {
        id: companyId,
        userId: userData.userId,
        isActive: true,
      },
    });

    return {
      accessToken: this._jwtService.sign({
        id: userData.userId,
        email: userData.email,
        // authId: userData.authId,
      }),
    };
  }
}
