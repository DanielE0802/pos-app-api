import { CreatePdvDto } from '../dto/create-pdv.dto';
import { UpdatePdvDto } from '../dto/update-pdv.dto';
import { Pdv } from '../entities/pdv.entity';

export interface PdvRepository {
  // create: (data: CreatePdvDto) => Promise<Pdv>;

  find: (companyId: string, rel: boolean) => Promise<Pdv[]>;

  findOne: (companyId: string, id: string, rel: boolean) => Promise<Pdv>;

  // update: (id: string, data: UpdatePdvDto, companyId: string) => Promise<Pdv>;

  delete: (entity: Pdv) => Promise<Pdv>;
}

export const I_PDV_REPOSITORY = 'PdvIRepository';
