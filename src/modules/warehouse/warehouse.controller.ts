import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  ParseBoolPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { CreatePdvDto } from './dto/create-warehouse.dto';
import { UpdatePdvDto } from './dto/update-warehouse.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUserCompany } from '../auth/decorators';
import { IRelationType } from 'src/common/types/relation.decorator';

@ApiTags('Punto de Venta')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly pdvService: WarehouseService) {}

  // @Post()
  // create(@GetUserCompany() company: IRelationType, @Body() data: CreatePdvDto) {
  //   if (!data.company) data.company = company;
  //   return this.pdvService.create(data);
  // }

  // @Get()
  // findAll(
  //   @GetUserCompany() company: IRelationType,
  //   @Query('r', ParseBoolPipe) rel: boolean = false,
  // ) {
  //   return this.pdvService.findAll(company.id, rel);
  // }

  // @Get(':id')
  // findOne(
  //   @GetUserCompany() company: IRelationType,
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Query('r', ParseBoolPipe) rel: boolean = false,
  // ) {
  //   return this.pdvService.findOne(id, company.id, rel);
  // }

  // @Patch(':id')
  // update(
  //   @GetUserCompany() company: IRelationType,
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body() data: UpdatePdvDto,
  // ) {
  //   return this.pdvService.update(id, data, company.id);
  // }

  // @Delete(':id')
  // async remove(
  //   @GetUserCompany() company: IRelationType,
  //   @Param('id', ParseUUIDPipe) id: string,
  // ) {
  //   return this.pdvService.remove(await this.findOne(company, id));
  // }
}
