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
import { PdvService } from './pdv.service';
import { CreatePdvDto } from './dto/create-pdv.dto';
import { UpdatePdvDto } from './dto/update-pdv.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/guards/jwt-auth.guard';
import { User } from '../user/entities/user.entity';
import { TokenUser } from 'src/common/constants/constant.app';
import { GetUser, GetUserCompany } from '../auth/decorators/get-user.decarator';
import { IRelationType } from 'src/common/decorators/relation.decorator';

@ApiTags('Punto de Venta')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('pdv')
export class PdvController {
  constructor(private readonly pdvService: PdvService) {}

  @Post()
  create(@Body() data: CreatePdvDto) {
    return this.pdvService.create(data);
  }

  @Get()
  findAll(
    @GetUserCompany() company: IRelationType,
    @Query('r', ParseBoolPipe) rel: boolean = false,
  ) {
    return this.pdvService.findAll(rel);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('r', ParseBoolPipe) rel: boolean = false,
  ) {
    return this.pdvService.findOne(id, rel);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePdvDto: UpdatePdvDto,
  ) {
    return this.pdvService.update(id, updatePdvDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.pdvService.remove(id);
  }
}
