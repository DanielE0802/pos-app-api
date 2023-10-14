import { Product } from '../entities/product.entity';
import { CustomRelations } from 'src/common/constants/types/types.app';

export const ProductRelations: Record<string, CustomRelations<Product>> = {
  general: {
    productMainProduct: true,
    // subProducts: true,
    productPdv: true,
    category: true,
    brand: true,
  },
  internals: {
    productMainProduct: true,
    // subProducts: true,
    productPdv: { pdv: true },
    category: true,
    brand: true,
  },
};
