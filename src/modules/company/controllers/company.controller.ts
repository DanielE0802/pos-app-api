import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCompanyDto } from '../dtos/company/create-company.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UpdateCompanyDto } from '../dtos/company/update-company.dto';
import { AddUserToCompanyService } from '../services/company/add-user-to-company.service';
import { CreateCompanyService } from '../services/company/create-company.service';
import { FindCompanyByCompanyIdService } from '../services/company/find-company.service';
import { RemoveCompanyService } from '../services/company/remove-company.service';
import { UpdateCompanyService } from '../services/company/update-company.service';

@ApiTags('Company')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('companies')
export class CompanyController {
  constructor(
    private readonly _addUserToCompanyService: AddUserToCompanyService,
    private readonly _createCompanyService: CreateCompanyService,
    private readonly _findCompanyByCompanyIdService: FindCompanyByCompanyIdService,
    private readonly _removeCompanyService: RemoveCompanyService,
    private readonly _updateCompanyService: UpdateCompanyService,
  ) {}

  @Post()
  create(@Body() data: CreateCompanyDto) {
    return this._createCompanyService.execute(data);
  }

  @Get(':companyId')
  findOne(@Param('companyId') companyId: string) {
    return this._findCompanyByCompanyIdService.execute(companyId);
  }

  @Patch(':companyId')
  update(
    @Param('companyId') companyId: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this._updateCompanyService.execute(companyId, updateCompanyDto);
  }

  @Delete(':companyId')
  remove(@Param('companyId') companyId: string) {
    return this._removeCompanyService.execute(companyId);
  }

  @Post(':companyId/user/:userId')
  addUser(
    @Param('companyId', ParseUUIDPipe) companyId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
  ) {
    return this._addUserToCompanyService.execute(companyId, userId);
  }
}
