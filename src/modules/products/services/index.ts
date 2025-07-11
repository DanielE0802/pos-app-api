import { CreateProductService } from './create-product.service';
import { FindProductsService } from './find-products.service';
import { FindOneProductService } from './find-one-products.service';

export * from './create-product.service';
export * from './find-products.service';
export * from './find-one-products.service';

export const ProductServices = {
  CreateProductService,
  FindProductsService,
  FindOneProductService,
};
