import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';
import { Brand } from '../entities/brand.entity';

export interface BrandRepository {
  
  create: (data: CreateBrandDto) => Promise<Brand>;
  
  find: (companyId: string, rel: boolean) => Promise<Brand[]>;
  
  findOne: (id: string, companyId: string, rel: boolean) => Promise<Brand>;
  
  update: (id: string, data: UpdateBrandDto, companyId: string) => Promise<Brand>;
  
  delete: (entity: Brand) => Promise<Brand>;
}

export const I_BRAND_REPOSITORY = 'BrandIRepository';
