import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/Category.entity';
import { CreateCategoryDto } from '../dto/create-Category.dto';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryImplRepository implements CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(data: CreateCategoryDto): Promise<Category> {
    return await this._save(
      this.categoryRepository.create({
        ...data,
      }),
    );
  }

  async getCategories(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  // +--------------------------------+
  // |  Private Encapsulated Methods  |
  // +--------------------------------+

  private async _save(Category: Category): Promise<Category> {
    return await this.categoryRepository.save(Category);
  }
}
