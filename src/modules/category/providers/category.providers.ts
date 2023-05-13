import { CategoryImplRepository } from '../repositories/category.impl.repository';
import { I_CATEGORY_REPOSITORY } from '../repositories/category.repository';

export const CategoryProviders = [
  {
    provide: I_CATEGORY_REPOSITORY,
    useClass: CategoryImplRepository,
  },
];
