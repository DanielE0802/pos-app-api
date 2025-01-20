import { Department } from '../entities/department.entity';

export interface LocationRepository {
  /**
   * It finds all the Products in the database and returns them
   * @returns An array of Product objects.
   */
  find: (rel: boolean) => Promise<Department[]>;

  findOne: (id: number, rel: boolean) => Promise<Department>;
}

export const I_LOCATION_REPOSITORY = 'LocationIRepository';
