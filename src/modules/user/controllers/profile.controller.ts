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
import { IRelationType } from 'src/common/decorators/relation.decorator';
import { GetUserCompany } from 'src/modules/auth/decorators/get-user.decarator';
import { JwtAuthGuard } from 'src/modules/auth/jwt/guards/jwt-auth.guard';

@ApiTags('Profile')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly brandService: ProfileService) {}

  @Post()
  create(@Body() data: CreateProfileDto) {
    return this.brandService.create(data);
  }

  @Get()
  findAll(
    @GetUserCompany() company: IRelationType,
    @Query('r', ParseBoolPipe) rel: boolean = false,
  ) {
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
