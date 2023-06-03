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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() data: CreateCategoryDto) {
    return this.categoryService.create(data);
  }

  @Get()
  findAll(@Query('r', ParseBoolPipe) rel: boolean = false) {
    return this.categoryService.findAll(rel);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('r', ParseBoolPipe) rel: boolean = false,
  ) {
    return this.categoryService.findOne(id, rel);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateCategoryDto) {
    return this.categoryService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
