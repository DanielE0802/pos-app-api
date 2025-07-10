import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateBrandDto } from '../dtos/company-brands/create-brand.dto';
import { UpdateBrandDto } from '../dtos/company-brands/update-brand.dto';

@Controller('companies/:companyId/brands')
export class CompanyBrandController {
  constructor(private readonly brandService: /* BrandService */ any) {}

  @Post()
  create(@Param('companyId') companyId: string, @Body() data: CreateBrandDto) {
    return this.brandService.create(companyId, data);
  }

  @Get()
  findAll(@Param('companyId') companyId: string) {
    return this.brandService.findAll(companyId);
  }

  @Get(':brandId')
  findOne(
    @Param('companyId') companyId: string,
    @Param('brandId') brandId: string,
  ) {
    return this.brandService.findOne(companyId, brandId);
  }

  @Patch(':brandId')
  update(
    @Param('companyId') companyId: string,
    @Param('brandId') brandId: string,
    @Body() data: UpdateBrandDto,
  ) {
    return this.brandService.update(companyId, brandId, data);
  }

  @Delete(':brandId')
  remove(
    @Param('companyId') companyId: string,
    @Param('brandId') brandId: string,
  ) {
    return this.brandService.remove(companyId, brandId);
  }
}
