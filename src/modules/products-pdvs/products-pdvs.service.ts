import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductsPdvDto } from './dto/create-products-pdv.dto';
import {
  I_PRODUCTS_PDVS_REPOSITORY,
  ProductPdvRepository,
} from './repositories/products-pdvs.repository';
import { CompanyService } from '../company/company.service';

@Injectable()
export class ProductsPdvsService {
  constructor(
    @Inject(I_PRODUCTS_PDVS_REPOSITORY)
    private readonly productPdvRepo: ProductPdvRepository,
    private readonly companyService: CompanyService,
  ) {}

  create = async (data: CreateProductsPdvDto | CreateProductsPdvDto[]) =>
    await this.productPdvRepo.create(data);

  findInPdvs = async (id: string) => {
    const company = await this.companyService.findOne(id, true);

    const products = await this.productPdvRepo.findInPdvs(
      company.pdvs.map((pdv) => pdv.id),
    );

    if (!products)
      throw new NotFoundException('Cant find Products in this Company');

    return products;
  };

  // findAll() {
  //   return `This action returns all productsPdvs`;
  // }

  // update(id: number, updateProductsPdvDto: UpdateProductsPdvDto) {
  //   return `This action updates a #${id} productsPdv`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} productsPdv`;
  // }
}
