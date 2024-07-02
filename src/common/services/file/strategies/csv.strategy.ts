import { Injectable } from '@nestjs/common';
import { FileGenerationStrategy } from '../file.service';
import { FileServiceResponse } from '../dto/file-strategy.response';
import { mimetypes } from 'src/common/constants/file';
import { Parser } from 'json2csv';

@Injectable()
export class CsvGenerationStrategy implements FileGenerationStrategy {
  /**
   * Generates a CSV file from the provided JSON data.
   *
   * @param {any} jsonData - The JSON data to be converted into CSV.
   * @returns {FileServiceResponse} - An object containing the filename, mimetype, and buffer of the generated CSV file.
   */
  generate(jsonData: any): FileServiceResponse {
    // Create a new Parser instance with the fields from the first object in the JSON data.
    const parser = new Parser({ fields: Object.keys(jsonData[0]) });

    // Parse the JSON data into CSV format.
    const csv = parser.parse(jsonData);

    // Return an object containing the filename, mimetype, and buffer of the generated CSV file.
    return {
      filename: `Reporte-${Date.now()}.${csv}`,
      mimetype: mimetypes.csv,
      buffer: Buffer.from(csv, 'utf-8'),
    };
  }
}

export const csv = 'csv';
