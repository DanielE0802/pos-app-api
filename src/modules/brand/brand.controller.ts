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
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  create(@Body() data: CreateBrandDto) {
    return this.brandService.create(data);
  }

  @Get()
  findAll(@Query('r', ParseBoolPipe) rel: boolean = false) {
    return this.brandService.findAll(rel);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('r', ParseBoolPipe) rel: boolean = false,
  ) {
    return this.brandService.findOne(id, rel);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateBrandDto) {
    return this.brandService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(id);
  }
}
