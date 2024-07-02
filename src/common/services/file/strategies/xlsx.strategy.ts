import { Injectable } from '@nestjs/common';
import { FileGenerationStrategy } from '../file.service';
import { FileServiceResponse } from '../dto/file-strategy.response';
import { mimetypes } from 'src/common/constants/file';
import * as _xlsx from 'xlsx';

@Injectable()
export class XlsxGenerationStrategy implements FileGenerationStrategy {
  /**
   * Generates an Excel file (.xlsx) from the provided JSON data.
   *
   * @param jsonData - The JSON data to be converted into an Excel file.
   * @returns A FileServiceResponse object containing the filename, mimetype, and buffer of the generated Excel file.
   */
  generate(jsonData: any): FileServiceResponse {
    const workbook = _xlsx.utils.book_new();
    const worksheet = _xlsx.utils.json_to_sheet(jsonData);

    // Identify and transform URLs into hyperlinks
    const range = _xlsx.utils.decode_range(worksheet['!ref']);
    for (let R = range.s.r + 1; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell_address = { c: C, r: R };
        const cell_ref = _xlsx.utils.encode_cell(cell_address);
        const cell = worksheet[cell_ref];
        if (cell && this.isUrl(cell.v)) {
          cell.l = { Target: cell.v, Tooltip: 'Click to open link' };
          cell.v = 'Ver Archivo'; // Text visible for the hyperlink
        }
      }
    }

    _xlsx.utils.book_append_sheet(workbook, worksheet, 'Reporte');

    return {
      filename: `Reporte-${Date.now()}.${xlsx}`,
      mimetype: mimetypes.xlsx,
      buffer: _xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' }),
    };
  }
  /**
   * Checks if a given string is a valid URL.
   *
   * @param value - The string to be checked.
   * @returns True if the string is a valid URL, false otherwise.
   */
  private isUrl(value: string): boolean {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }
}

export const xlsx = 'xlsx';
