import { Inject, Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { Stock } from 'src/common/entities/stock';
import { StockRepository } from 'src/common/repositories/stock.repository';
// import { CompanyService } from '../company/company.service';

@Injectable()
export class StockService {
  constructor(
    @Inject(StockRepository)
    private readonly stockRepository: StockRepository, // private readonly companyService: CompanyService,
  ) {}

  async create(data: CreateStockDto[]): Promise<any> {
    return await this.stockRepository.save(data, { chunk: 10 });
  }

  async findAll(): Promise<Stock[]> {
    return await this.stockRepository.find();
  }

  async findOne(id: string): Promise<Stock> {
    return await this.stockRepository.findOne({ where: { id } });
  }

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
