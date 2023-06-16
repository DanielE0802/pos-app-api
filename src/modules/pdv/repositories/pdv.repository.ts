import { CreatePdvDto } from '../dto/create-pdv.dto';
import { UpdatePdvDto } from '../dto/update-pdv.dto';
import { Pdv } from '../entities/pdv.entity';

export interface PdvRepository {
  create: (data: CreatePdvDto) => Promise<Pdv>;

  find: (rel: boolean) => Promise<Pdv[]>;

  findOne: (id: string, rel: boolean) => Promise<Pdv>;

  update: (id: string, data: UpdatePdvDto) => Promise<Pdv>;

  delete: (id: string) => Promise<Pdv>;
}

export const I_PDV_REPOSITORY = 'PdvIRepository';
