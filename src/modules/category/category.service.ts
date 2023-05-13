import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  CategoryRepository,
  I_CATEGORY_REPOSITORY,
} from './repositories/category.repository';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(I_CATEGORY_REPOSITORY)
    private readonly categoryRepository: CategoryRepository,
  ) {}

  create(data: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.getCategories();
  }

  findOne(id: string) {
    return `This action returns a #${id} category`;
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: string) {
    return `This action removes a #${id} category`;
  }
}
