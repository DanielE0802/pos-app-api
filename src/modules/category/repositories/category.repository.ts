import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from '../entities/category.entity';

export interface CategoryRepository {
  /**
   * It saves the Category to the database and returns the saved Category
   * @param {CreateCategoryDto} createCategoryDto - CreateCategoryDto
   * @returns The Category that was updated
   */
  create: (data: CreateCategoryDto) => Promise<Category>;
  /**
   * It finds all the Categorys in the database and returns them
   * @returns An array of Category objects.
   */
  find: (companyId: string, rel: boolean) => Promise<Category[]>;

  findOne: (id: string, rel: boolean) => Promise<Category>;

  update: (id: string, data: UpdateCategoryDto) => Promise<Category>;

  delete: (id: string) => Promise<Category>;
}

export const I_CATEGORY_REPOSITORY = 'CategoriesIRepository';
