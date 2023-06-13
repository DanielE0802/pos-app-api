import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pdv } from '../entities/pdv.entity';
import { PdvRepository } from './pdv.repository';
import { CreatePdvDto } from '../dto/create-pdv.dto';
import { UpdatePdvDto } from '../dto/update-pdv.dto';

export class PdvImplRepository implements PdvRepository {
  constructor(
    @InjectRepository(Pdv)
    private readonly pdvRepo: Repository<Pdv>,
  ) {}

  create = async (data: CreatePdvDto): Promise<Pdv> =>
    await this.pdvRepo.save(this.pdvRepo.create(data));

  find = async (rel: boolean): Promise<Pdv[]> =>
    await this.pdvRepo.find({ relations: { location: rel }, cache: true });

  findOne = async (id: string, rel: boolean): Promise<Pdv> =>
    await this.pdvRepo.findOne({
      where: { id },
      relations: { location: rel },
      cache: true,
    });

  update = async (id: string, data: UpdatePdvDto): Promise<any> =>
    await this.pdvRepo.update(id, data);

  delete = async (id: string): Promise<Pdv> =>
    await this.pdvRepo.remove(await this.findOne(id, false));
}
