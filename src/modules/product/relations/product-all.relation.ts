import { Product } from '../entities/product.entity';
import { CustomRelations } from 'src/common/constants/constant.app';

export const ProductRelations: Record<string, CustomRelations<Product>> = {
  general: {
    productMainProduct: true,
    // subProducts: true,
    productPdv: true,
  },
  internals: {
    productMainProduct: true,
    // subProducts: true,
    productPdv: { pdv: true },
  },
};
