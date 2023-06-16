import { FindOptionsRelations } from 'typeorm';
import { Category } from './entities/category.entity';

export const RelationsCategory: Record<
  string,
  FindOptionsRelations<Category>
> = {
  findAllRelations: {
    products: true,
    subcategories: { categoryMainCategory: true },
  },
};
