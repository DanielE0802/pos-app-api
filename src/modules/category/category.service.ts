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

  findAll = async (companyId: string, rel: boolean): Promise<Category[]> =>
    await this.categoryRepo.find(companyId, rel);

  findOne = async (id: string, companyId: string, rel: boolean) =>
    await this.categoryRepo.findOne(id, companyId, rel);

  update = async (id: string, data: UpdateCategoryDto, companyId: string) =>
    await this.categoryRepo.update(id, data, companyId);

  remove = async (entity: Category) => await this.categoryRepo.delete(entity);
}
