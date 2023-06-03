import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';
import { Brand } from '../entities/brand.entity';

export interface BrandRepository {
  
  create: (data: CreateBrandDto) => Promise<Brand>;
  
  find: (rel: boolean) => Promise<Brand[]>;
  
  findOne: (id: string, rel: boolean) => Promise<Brand>;
  
  update: (id: string, data: UpdateBrandDto) => Promise<Brand>;
  
  delete: (id: string) => Promise<Brand>;
}

export const I_BRAND_REPOSITORY = 'BrandIRepository';
