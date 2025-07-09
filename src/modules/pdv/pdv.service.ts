import { Inject, Injectable } from '@nestjs/common';
import { CreatePdvDto } from './dto/create-pdv.dto';
import { UpdatePdvDto } from './dto/update-pdv.dto';
import { I_PDV_REPOSITORY, PdvRepository } from './repositories/pdv.repository';
import { Pdv } from './entities/pdv.entity';

@Injectable()
export class PdvService {
  constructor(
    @Inject(I_PDV_REPOSITORY)
    private readonly pdvRepo: PdvRepository,
  ) {}

  // create = async (data: CreatePdvDto) => await this.pdvRepo.create(data);

  findAll = async (companyId: string, rel: boolean): Promise<Pdv[]> =>
    await this.pdvRepo.find(companyId, rel);

  findOne = async (id: string, companyId: string, rel: boolean) =>
    await this.pdvRepo.findOne(id, companyId, rel);

  // update = async (id: string, data: UpdatePdvDto, companyId: string) =>
  //   await this.pdvRepo.update(id, data, companyId);

  remove = async (entity: Pdv) => await this.pdvRepo.delete(entity);
}
