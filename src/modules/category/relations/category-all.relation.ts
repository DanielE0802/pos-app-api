import { Category } from '../entities/category.entity';
import { ProductRelations } from '../../product/relations/product-all.relation';
import { CustomRelations } from 'src/common/constants/constant.app';

export const RelationsCategory: Record<string, CustomRelations<Category>> = {
  general: {
    categoryMainCategory: true,
    subcategories: true,
  },
  internals: {
    products: ProductRelations.internals,
    categoryMainCategory: true,
    subcategories: true,
  },
};
