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
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IRelationType } from 'src/common/decorators/relation.decorator';
import { GetUserCompany } from '../auth/decorators/get-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Category')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(
    @GetUserCompany() company: IRelationType,
    @Body() data: CreateCategoryDto,
  ) {
    data.company = company;
    return this.categoryService.create(data);
  }

  @Get()
  findAll(
    @GetUserCompany() company: IRelationType,
    @Query('r', ParseBoolPipe) rel: boolean = false,
  ) {
    return this.categoryService.findAll(company.id, rel);
  }

  @Get(':id')
  findOne(
    @GetUserCompany() company: IRelationType,
    @Param('id') id: string,
    @Query('r', ParseBoolPipe) rel: boolean = false,
  ) {
    return this.categoryService.findOne(id, company.id, rel);
  }

  @Patch(':id')
  update(
    @GetUserCompany() company: IRelationType,
    @Param('id') id: string,
    @Body() data: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, data, company.id);
  }

  @Delete(':id')
  async remove(
    @GetUserCompany() company: IRelationType,
    @Param('id') id: string,
  ) {
    return this.categoryService.remove(await this.findOne(company, id));
  }
}
