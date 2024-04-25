export const MAX_FILE_SIZE = 10000000;

export type FileExtensions = 'xlsx' | 'csv';

export const mimetypes: { [key: string]: string } = {
  csv: 'text/csv',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};
