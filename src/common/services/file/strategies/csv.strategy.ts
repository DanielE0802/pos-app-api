import { Injectable } from '@nestjs/common';
import { FileGenerationStrategy } from '../file.service';
import { FileServiceResponse } from '../dto/file-strategy.response';
import { mimetypes } from 'src/common/constants/app/file';
import { Parser } from 'json2csv';

@Injectable()
export class CsvGenerationStrategy implements FileGenerationStrategy {
  generate(jsonData: any): FileServiceResponse {
    const parser = new Parser({ fields: Object.keys(jsonData[0]) });
    const csv = parser.parse(jsonData);

    return {
      filename: `Reporte-${Date.now()}.csv`,
      mimetype: mimetypes.csv,
      buffer: Buffer.from(csv, 'utf-8'),
    };
  }
}

export const csv = 'csv';
