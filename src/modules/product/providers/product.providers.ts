import { ProductImplRepository } from '../repositories/product.impl.repository';
import { I_PRODUCT_REPOSITORY } from '../repositories/product.repository';

export const ProductProviders = [
  {
    provide: I_PRODUCT_REPOSITORY,
    useClass: ProductImplRepository,
  },
];
