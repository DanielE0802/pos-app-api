import type { ReadStream } from 'fs';

export interface FileUpload {
  filename: string;
  fieldName: string;
  mimetype: string;
  encoding: string;
  createReadStream(): ReadStream;
}
