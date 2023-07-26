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
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IRelationType } from 'src/common/decorators/relation.decorator';
import { GetUserCompany } from '../auth/decorators/get-user.decarator';
import { JwtAuthGuard } from '../auth/jwt/guards/jwt-auth.guard';

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
  findAll(@GetUserCompany() company: IRelationType) {
    return this.productService.findAll(company.id);
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
