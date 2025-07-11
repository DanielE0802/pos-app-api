import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/common/entities';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../../dtos/company-categories/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly _categoryRepo: Repository<Category>,
  ) {}

  async create(companyId: string, dto: CreateCategoryDto) {
    const { name, description } = dto;
    const category = this._categoryRepo.create({
      name,
      description,
      companyId,
    });

    return await this._categoryRepo.save(category);
  }
}
