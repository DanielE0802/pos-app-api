import { CreateCategoryDto } from '../dto/create-category.dto';
import { Category } from '../entities/Category.entity';

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
  getCategories: () => Promise<Category[]>;
}

export const I_CATEGORY_REPOSITORY = 'CategoriesIRepository';
