import { Injectable } from '@nestjs/common';
// import { Parser } from 'json2csv';
import { Buffer } from 'buffer';

@Injectable()
export class FileService {
  public generateCsv(jsonData: any): Buffer {
    const csv = this.jsonToCsv(jsonData.answers);
    return Buffer.from(csv, 'utf-8');
  }

  // TODO: Cange lib to json-2-csv

  private jsonToCsv(jsonData: any): string {
    const fields = Object.keys(jsonData[0]); // Asume que todos los objetos tienen las mismas claves
    return;
    // const parser = new Parser({ fields });
    // return parser.parse(jsonData);
  }
}
