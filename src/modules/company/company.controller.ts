import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseBoolPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IRelationType } from 'src/common/decorators/relation.decorator';
import { GetUser, GetUserCompany } from '../auth/decorators/get-user.decarator';
import { JwtAuthGuard } from '../auth/jwt/guards/jwt-auth.guard';
import { User } from '../user/entities/user.entity';

@ApiTags('Company')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(@GetUser() user: User, @Body() data: CreateCompanyDto) {
    return this.companyService.create(data);
  }

  @Get()
  findAll(
    @GetUserCompany() company: IRelationType,
    @Query('r', ParseBoolPipe) rel: boolean = false,
  ) {
    return this.companyService.findAll(rel);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('r', ParseBoolPipe) rel: boolean = false,
  ) {
    return this.companyService.findOne(id, rel);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(id);
  }
}
