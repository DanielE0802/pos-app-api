import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { RelationsCategory } from '../relations/category-all.relation';

@Injectable()
export class CategoryImplRepository implements CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  create = async (data: CreateCategoryDto): Promise<Category> =>
    await this.categoryRepo.save(this.categoryRepo.create(data));

  find = async (companyId: string, rel: boolean): Promise<Category[]> =>
    await this.categoryRepo.find({
      where: { company: { id: companyId } },
      relations: rel && RelationsCategory.general,
      cache: true,
      loadEagerRelations: true,
    });

  findOne = async (id: string, rel: boolean): Promise<Category> =>
    await this.categoryRepo.findOne({
      where: { id },
      relations: rel && RelationsCategory.internals,
      cache: true,
    });

  update = async (id: string, data: UpdateCategoryDto): Promise<any> =>
    await this.categoryRepo.update(id, data);

  delete = async (id: string): Promise<Category> =>
    await this.categoryRepo.remove(await this.findOne(id, false));
}
