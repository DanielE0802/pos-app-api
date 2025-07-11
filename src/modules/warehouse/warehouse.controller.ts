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
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUserCompany } from '../auth/decorators';

@ApiTags('Warehouse')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post()
  create(
    @GetUserCompany() companyId: string,
    @Body() data: CreateWarehouseDto,
  ) {
    return this.warehouseService.create(companyId, data);
  }

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
