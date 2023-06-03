import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../entities/product.entity';

export interface ProductRepository {
  /**
   * It saves the Product to the database and returns the saved Product
   * @param {CreateProductDto} createProductDto - CreateProductDto
   * @returns The Product that was updated
   */
  create: (data: CreateProductDto) => Promise<Product>;
  /**
   * It finds all the Products in the database and returns them
   * @returns An array of Product objects.
   */
  getProducts: () => Promise<Product[]>;

  getProduct: (id: string) => Promise<Product>;
}

export const I_PRODUCT_REPOSITORY = 'ProductsIRepository';
