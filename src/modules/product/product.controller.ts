import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IRelationType } from 'src/common/types/relation.decorator';
import { GetUserCompany } from '../auth/decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@ApiTags('Product')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(
    @GetUserCompany() company: IRelationType,
    @Body() data: CreateProductDto,
  ) {
    return this.productService.create(data, company.id);
  }

  @Get()
  findAll(
    @GetUserCompany() company: IRelationType,
    @Query() pags: PaginationDto,
  ) {
    return this.productService.findAll(company.id, pags);
  }

  @Get(':id')
  findOne(
    @GetUserCompany() company: IRelationType,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.productService.findOne(id, company.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateProductDto) {
    return this.productService.update(id, data);
  }

  @Delete(':id')
  async remove(
    @GetUserCompany() company: IRelationType,
    @Param('id') id: string,
  ) {
    return this.productService.remove(await this.findOne(company, id));
  }
}
