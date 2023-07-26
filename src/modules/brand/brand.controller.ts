import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseBoolPipe,
  UseGuards,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IRelationType } from 'src/common/decorators/relation.decorator';
import { GetUserCompany } from '../auth/decorators/get-user.decarator';
import { JwtAuthGuard } from '../auth/jwt/guards/jwt-auth.guard';

@ApiTags('Brand')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  create(
    @GetUserCompany() company: IRelationType,
    @Body() data: CreateBrandDto,
  ) {
    data.company = company;
    return this.brandService.create(data);
  }

  @Get()
  findAll(
    @GetUserCompany() company: IRelationType,
    @Query('r', ParseBoolPipe) rel: boolean = false,
  ) {
    return this.brandService.findAll(company.id, rel);
  }

  @Get(':id')
  findOne(
    @GetUserCompany() company: IRelationType,
    @Param('id') id: string,
    @Query('r', ParseBoolPipe) rel: boolean = false,
  ) {
    return this.brandService.findOne(id, company.id, rel);
  }

  @Patch(':id')
  update(
    @GetUserCompany() company: IRelationType,
    @Param('id') id: string,
    @Body() data: UpdateBrandDto,
  ) {
    return this.brandService.update(id, data, company.id);
  }

  @Delete(':id')
  async remove(
    @GetUserCompany() company: IRelationType,
    @Param('id') id: string,
  ) {
    return this.brandService.remove(await this.findOne(company, id));
  }
}
