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
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IRelationType } from 'src/common/types/relation.decorator';
import { GetUserCompany } from '../auth/decorators';

@ApiTags('Stock')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  // @Post()
  // create(@Body() data: CreateProductsPdvDto) {
  //   return this.productsPdvsService.create(data);
  // }

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
