import { Inject, Injectable } from '@nestjs/common';
import { Warehouse } from '../../common/entities/warehouse.entity';
import { WarehouseRepository } from 'src/common/repositories/warehouse.repository';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';

@Injectable()
export class WarehouseService {
  constructor(
    @Inject(WarehouseRepository)
    private readonly warehouseRepo: WarehouseRepository,
  ) {}

  async create(companyId: string, data: CreateWarehouseDto) {
    const warehouse = this.warehouseRepo.create(data);
    warehouse.companyId = companyId;
    return await this.warehouseRepo.save(warehouse);
  }

  async find(companyId: string, rel: boolean): Promise<Warehouse[]> {
    return await this.warehouseRepo.find({
      where: { company: { id: companyId } },
      relations: { location: rel },
      cache: true,
    });
  }

  async findOne(
    id: string,
    companyId: string,
    rel: boolean,
  ): Promise<Warehouse> {
    return await this.warehouseRepo.findOne({
      where: { id },
      relations: { location: rel, stock: { product: true } },
      cache: true,
    });
  }

  async delete(entity: Warehouse): Promise<Warehouse> {
    return await this.warehouseRepo.remove(entity);
  }
}
