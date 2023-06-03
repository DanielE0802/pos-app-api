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
    private readonly categoryRepo: CategoryRepository,
  ) {}

  create = async (data: CreateCategoryDto) =>
    await this.categoryRepo.create(data);

  findAll = async (rel: boolean): Promise<Category[]> =>
    await this.categoryRepo.find(rel);

  findOne = async (id: string, rel: boolean) =>
    await this.categoryRepo.findOne(id, rel);

  update = async (id: string, data: UpdateCategoryDto) =>
    await this.categoryRepo.update(id, data);

  remove = async (id: string) => await this.categoryRepo.delete(id);
}
