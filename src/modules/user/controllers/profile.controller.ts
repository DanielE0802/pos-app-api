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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProfileService } from '../services/profile.service';
import { UpdateProfileDto } from '../dto/profile/update-profile.dto';
import { CreateProfileDto } from '../dto/profile/create-profile.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@ApiTags('Profile')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // @Post()
  // create(@Body() data: CreateProfileDto) {
  //   return this.profileService.create(data);
  // }

  // @Get()
  // findAll(@Query('r', ParseBoolPipe) rel: boolean = false) {
  //   return this.profileService.findAll(rel);
  // }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('r', ParseBoolPipe) rel: boolean = false,
  ) {
    return this.profileService.findOne(id, rel);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateProfileDto) {
    return this.profileService.update(id, data);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.profileService.remove(id);
  // }
}
