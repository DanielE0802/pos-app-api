import { BadRequestException, Injectable } from '@nestjs/common';
import { FileServiceResponse } from './dto/file-strategy.response';
import { csv, CsvGenerationStrategy } from './strategies/csv.strategy';
import { xlsx, XlsxGenerationStrategy } from './strategies/xlsx.strategy';
import { JsonProcessorService } from './helpers/process-json-file.helper';
import { FileExtensions } from 'src/common/constants/app/file';
import { NotFoundMsgs } from 'src/common/constants/app/exceptions';

export interface FileGenerationStrategy {
  generate(jsonData: any): FileServiceResponse;
}

@Injectable()
export class FileService {
  /**
   * A map of file generation strategies.
   * The keys are the file extensions, and the values are the corresponding strategies.
   */
  private readonly strategies: Map<string, FileGenerationStrategy> = new Map();

  constructor(private readonly jsonProcessor: JsonProcessorService) {
    this.strategies.set(csv, new CsvGenerationStrategy());
    this.strategies.set(xlsx, new XlsxGenerationStrategy());
    // More strategies
  }
  /**
   * Creates a new file based on the specified type and JSON data.
   *
   * @param type - The file type (extension).
   * @param jsonData - The JSON data to be converted into the file.
   * @returns The response containing the file data and metadata.
   * @throws {BadRequestException} If the specified file type is not supported.
   */
  public create(type: FileExtensions, jsonData: any): FileServiceResponse {
    const strategy = this.strategies.get(type);
    if (!strategy)
      throw new BadRequestException(NotFoundMsgs.UnsupportedFileType);

    return strategy.generate(this.jsonProcessor.processAndConvert(jsonData));
  }
}
