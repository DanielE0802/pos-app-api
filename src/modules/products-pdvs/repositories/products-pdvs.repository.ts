import { CreateProductsPdvDto } from '../dto/create-products-pdv.dto';
import { ProductPdv } from '../entities/product-pdv.entity';

export interface ProductPdvRepository {
  /**
   * It saves the Product to the database and returns the saved Product
   * @param {CreateProductsPdvDto} data - CreateProductsPdvDto
   * @returns The Product that was updated
   */
  create: (data: CreateProductsPdvDto | CreateProductsPdvDto[]) => Promise<any>;
  /**
   * It finds all the Products in the database and returns them
   * @returns An array of Product objects.
   */
  findAll: () => Promise<ProductPdv[]>;

  findOne: (id: string) => Promise<ProductPdv>;

  // findInPdvs: (companyId: string, pdvsId: string[]) => Promise<ProductPdv[]>;
}

export const I_PRODUCTS_PDVS_REPOSITORY = 'ProductsPdvsIRepository';
