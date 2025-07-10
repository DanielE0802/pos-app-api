import { In, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductPdv } from '../../products-pdvs/entities/product-pdv.entity';
import { CreateProductsPdvDto } from '../dto/create-products-pdv.dto';
import { ProductPdvRepository } from './products-pdvs.repository';

@Injectable()
export class ProductPdvImplRepository implements ProductPdvRepository {
  constructor(
    @InjectRepository(ProductPdv)
    private readonly productPdvRepo: Repository<ProductPdv>,
  ) {}

  create = async (data: CreateProductsPdvDto[]): Promise<any> =>
    await this.productPdvRepo.save(data, { chunk: 10 });

  findAll = async (): Promise<ProductPdv[]> => await this.productPdvRepo.find();

  findOne: (id: string) => Promise<ProductPdv>;

  // findInPdvs = async (
  //   companyId: string,
  //   pdvsId: string[],
  // ): Promise<ProductPdv[]> =>
  //   await this.productPdvRepo.find({
  //     where: { pdv: { id: In(pdvsId), company: { id: companyId } } },
  //     relations: { product: true },
  //     cache: true,
  //   });
}
