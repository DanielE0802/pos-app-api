import { ProductPdvImplRepository } from '../repositories/products-pdvs.impl.repository';
import { I_PRODUCTS_PDVS_REPOSITORY } from '../repositories/products-pdvs.repository';

export const ProductsPdvsProviders = [
  {
    provide: I_PRODUCTS_PDVS_REPOSITORY,
    useClass: ProductPdvImplRepository,
  },
];
