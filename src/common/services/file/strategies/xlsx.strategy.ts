import { Injectable } from '@nestjs/common';
import { FileGenerationStrategy } from '../file.service';
import { FileServiceResponse } from '../dto/file-strategy.response';
import { mimetypes } from 'src/common/constants/app/file';
import * as _xlsx from 'xlsx';

@Injectable()
export class XlsxGenerationStrategy implements FileGenerationStrategy {
  generate(jsonData: any): FileServiceResponse {
    const workbook = _xlsx.utils.book_new();
    const worksheet = _xlsx.utils.json_to_sheet(jsonData);

    // Identificar y transformar URLs en hipervínculos
    const range = _xlsx.utils.decode_range(worksheet['!ref']);
    for (let R = range.s.r + 1; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell_address = { c: C, r: R };
        const cell_ref = _xlsx.utils.encode_cell(cell_address);
        const cell = worksheet[cell_ref];
        if (cell && this.isUrl(cell.v)) {
          cell.l = { Target: cell.v, Tooltip: 'Click to open link' };
          cell.v = 'Ver Archivo'; // Texto visible para el hipervínculo
        }
      }
    }

    _xlsx.utils.book_append_sheet(workbook, worksheet, 'Reporte');

    return {
      filename: `Reporte-${Date.now()}.xlsx`,
      mimetype: mimetypes.xlsx,
      buffer: _xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' }),
    };
  }

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
