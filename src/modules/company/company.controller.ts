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
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(@Body() data: CreateCompanyDto) {
    return this.companyService.create(data);
  }

  @Get()
  findAll(@Query('r', ParseBoolPipe) rel: boolean = false) {
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
