import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseBoolPipe,
  Query,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  findAll(@Query('r', ParseBoolPipe) rel: boolean = false) {
    return this.locationService.findAll(rel);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('r', ParseBoolPipe) rel: boolean = false,
  ) {
    return this.locationService.findOne(id, rel);
  }
}
