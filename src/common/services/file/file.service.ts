import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ExcMsgs } from 'src/common/constants/app/exceptions';
import { FileExtensions } from 'src/common/constants/app/file';
import { FileServiceResponse } from './dto/file-strategy.response';
import { csv, CsvGenerationStrategy } from './strategies/csv.strategy';
import { xlsx, XlsxGenerationStrategy } from './strategies/xlsx.strategy';
import { JsonProcessorService } from './helpers/process-json-file.helper';

export interface FileGenerationStrategy {
  generate(jsonData: any): FileServiceResponse;
}

@Injectable()
export class FileService {
  private readonly strategies: Map<string, FileGenerationStrategy> = new Map();

  constructor(private readonly jsonProcessor: JsonProcessorService) {
    this.strategies.set(csv, new CsvGenerationStrategy());
    this.strategies.set(xlsx, new XlsxGenerationStrategy());
    // More strategies
  }

  public create(type: FileExtensions, jsonData: any): FileServiceResponse {
    const strategy = this.strategies.get(type);
    if (!strategy) throw new BadRequestException(ExcMsgs.UnsupportedFileType);

    return strategy.generate(this.jsonProcessor.processAndConvert(jsonData));
  }
}
