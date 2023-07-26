import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
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
  findAll: (companyId: string) => Promise<Product[]>;

  findOne: (id: string, companyId: string) => Promise<Product>;

  update: (id: string, data: UpdateProductDto) => Promise<any>;

  delete: (entity: any) => Promise<void>;
}

export const I_PRODUCT_REPOSITORY = 'ProductsIRepository';
