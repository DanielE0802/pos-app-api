import { ProductRelations } from '../../product/relations/product-all.relation';
import { CustomRelations } from 'src/common/constants/types/types.app';
import { Brand } from '../entities/brand.entity';

export const RelationsBrand: Record<string, CustomRelations<Brand>> = {
  general: {
    company: true,
  },
  internals: {
    company: true,
    products: ProductRelations.internals,
  },
};
