import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from '../dtos/company-categories/create-category.dto';
import { UpdateCategoryDto } from '../dtos/company-categories/update-category.dto';

@Controller('companies/:companyId/categories')
export class CompanyCategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(
    @Param('companyId') companyId: string,
    @Body() data: CreateCategoryDto,
  ) {
    return this.categoryService.create(companyId, data);
  }

  @Get()
  findAll(@Param('companyId') companyId: string) {
    return this.categoryService.findAll(companyId);
  }

  @Get(':categoryId')
  findOne(
    @Param('companyId') companyId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return this.categoryService.findOne(companyId, categoryId);
  }

  @Patch(':categoryId')
  update(
    @Param('companyId') companyId: string,
    @Param('categoryId') categoryId: string,
    @Body() data: UpdateCategoryDto,
  ) {
    return this.categoryService.update(companyId, categoryId, data);
  }

  @Delete(':categoryId')
  remove(
    @Param('companyId') companyId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return this.categoryService.remove(companyId, categoryId);
  }
}
