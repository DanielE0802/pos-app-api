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

  find = async (companyId: string, rel: boolean): Promise<Pdv[]> =>
    await this.pdvRepo.find({
      where: { company: { id: companyId } },
      relations: { location: rel },
      cache: true,
    });

  findOne = async (id: string, companyId: string, rel: boolean): Promise<Pdv> =>
    await this.pdvRepo.findOne({
      where: { id },
      relations: { location: rel, productPdv: { product: true } },
      cache: true,
    });

  update = async (
    id: string,
    data: UpdatePdvDto,
    companyId: string,
  ): Promise<any> =>
    await this.pdvRepo.update({ id, company: { id: companyId } }, data);

  delete = async (entity: Pdv): Promise<Pdv> =>
    await this.pdvRepo.remove(entity);
}
