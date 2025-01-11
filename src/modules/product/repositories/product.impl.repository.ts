import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductRelations } from '../relations/product-all.relation';
import { UpdateProductDto } from '../dto/update-product.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class ProductImplRepository implements ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  create = async (data: CreateProductDto): Promise<Product> =>
    await this.productRepo.save(this.productRepo.create(data));

  findAll = async (
    companyId: string,
    pags: PaginationDto,
  ): Promise<Product[]> =>
    await this.productRepo.find({
      where: { productPdv: { pdv: { company: { id: companyId } } } },
      relations: ProductRelations.general,
      skip: pags.offset,
      take: pags.limit,
    });

  findOne = async (id: string, companyId: string): Promise<Product> =>
    await this.productRepo.findOne({
      where: { id, productPdv: { pdv: { company: { id: companyId } } } },
      relations: ProductRelations.internals,
    });

  update = async (id: string, data: UpdateProductDto): Promise<any> =>
    await this.productRepo.update(id, data);

  delete = async (entity: Product): Promise<any> =>
    await this.productRepo.remove(entity);
}
