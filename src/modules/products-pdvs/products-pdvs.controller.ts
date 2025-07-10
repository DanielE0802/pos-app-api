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
import { ProductsPdvsService } from './products-pdvs.service';
import { CreateProductsPdvDto } from './dto/create-products-pdv.dto';
import { UpdateProductsPdvDto } from './dto/update-products-pdv.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IRelationType } from 'src/common/types/relation.decorator';
import { GetUserCompany } from '../auth/decorators';

@ApiTags('Product x Pdvs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
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

  // @Get('pdv/:id')
  // findOne(
  //   @GetUserCompany() company: IRelationType,
  //   @Param('id', ParseUUIDPipe) pdvId: string,
  // ) {
  //   return this.productsPdvsService.findInPdvs(company.id, [pdvId]);
  // }

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
