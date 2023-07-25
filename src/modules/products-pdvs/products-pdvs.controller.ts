import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProductsPdvsService } from './products-pdvs.service';
import { CreateProductsPdvDto } from './dto/create-products-pdv.dto';
import { UpdateProductsPdvDto } from './dto/update-products-pdv.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product x Pdvs')
@Controller('products-pdvs')
export class ProductsPdvsController {
  constructor(private readonly productsPdvsService: ProductsPdvsService) {}

  @Post()
  create(@Body() data: CreateProductsPdvDto) {
    return this.productsPdvsService.create(data);
  }

  // @Get()
  // findAll() {
  //   return this.productsPdvsService.findAll();
  // }

  @Get('company/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsPdvsService.findInPdvs(id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateProductsPdvDto: UpdateProductsPdvDto,
  // ) {
  //   return this.productsPdvsService.update(+id, updateProductsPdvDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productsPdvsService.remove(+id);
  // }
}
