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

  create = async (data: CreatePdvDto) => await this.pdvRepo.create(data);

  findAll = async (rel: boolean): Promise<Pdv[]> =>
    await this.pdvRepo.find(rel);

  findOne = async (id: string, rel: boolean) =>
    await this.pdvRepo.findOne(id, rel);

  update = async (id: string, data: UpdatePdvDto) =>
    await this.pdvRepo.update(id, data);

  remove = async (id: string) => await this.pdvRepo.delete(id);
}
