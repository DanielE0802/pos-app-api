export const MAX_FILE_SIZE = 10000000;

export const fileExtensions = ['xlsx', 'csv'] as const;
export type FileExtensions = (typeof fileExtensions)[number];

export const mimetypes: { [key: string]: string } = {
  csv: 'text/csv',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};
