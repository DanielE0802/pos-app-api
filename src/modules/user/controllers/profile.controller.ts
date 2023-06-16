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
import { ApiTags } from '@nestjs/swagger';
import { ProfileService } from '../services/profile.service';
import { UpdateProfileDto } from '../dto/profile/update-profile.dto';
import { CreateProfileDto } from '../dto/profile/create-profile.dto';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly brandService: ProfileService) {}

  @Post()
  create(@Body() data: CreateProfileDto) {
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
  update(@Param('id') id: string, @Body() data: UpdateProfileDto) {
    return this.brandService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(id);
  }
}
