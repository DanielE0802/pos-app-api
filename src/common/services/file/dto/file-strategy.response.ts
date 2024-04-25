import { Buffer } from 'buffer';

export interface FileServiceResponse {
  filename: string;
  mimetype: string;
  buffer: Buffer;
}
