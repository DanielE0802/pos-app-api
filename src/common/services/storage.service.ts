import { ConfigType } from '@nestjs/config';
import {
  Inject,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as Minio from 'minio';
import configuration from '../config/configuration';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);

  private storage: Minio.Client;
  private bucket: string;

  constructor(
    @Inject(configuration.KEY) private config: ConfigType<typeof configuration>,
  ) {
    if (!this.config.STORAGE.IS_ENABLED) return;

    this.storage = new Minio.Client({
      endPoint: this.config.STORAGE.API_ENDPOINT,
      port: this.config.STORAGE.PORT,
      accessKey: this.config.STORAGE.ACCESS_KEY,
      secretKey: this.config.STORAGE.SECRET_KEY,
      useSSL: this.config.STORAGE.USE_SSL,
    });

    this.init();
  }
  /**
   * Initializes the storage bucket.
   */
  async init() {
    this.bucket = this.config.STORAGE.BUCKET_NAME;
    const exists = await this.storage.bucketExists(this.bucket);

    if (!exists)
      this.storage.makeBucket(this.bucket, (err) => {
        if (err) this.logger.error('MinIO error ' + err);
      });

    this.logger.log(`Bucket ${this.bucket} init`);
  }
  /**
   * Generates a signed URL for a given object in the storage bucket.
   * @param url - The URL of the object.
   * @returns The signed URL or the name of the unavailable exception.
   */
  async signedURL(url: string) {
    if (!this.config.STORAGE.IS_ENABLED)
      return new ServiceUnavailableException('Minio.Client').name;

    const EXPIRY_SECONDS = 3600;

    const signedUrl = await this.storage.presignedGetObject(
      this.bucket,
      url,
      EXPIRY_SECONDS,
    );

    return signedUrl;
  }
  /**
   * Uploads a file to the storage bucket.
   * @param file - The file object containing the filename, base64Data, mimetype, and optional subfolder.
   * @returns The filename of the uploaded file.
   */
  async upload(file: {
    filename: string;
    base64Data: Buffer | string;
    mimetype: string;
    subfolder?: string;
  }): Promise<string> {
    let { base64Data } = file;
    if (!this.config.STORAGE.IS_ENABLED) return null;

    let filename = `${randomUUID()}.${this.getFileExtension(file.filename)}`;
    if (file.subfolder) filename = `${file.subfolder}/${filename}`;

    if (typeof file.base64Data === 'string' && this.isBase64(file.base64Data))
      base64Data = Buffer.from(this.formatBase64(file.base64Data), 'base64');

    const buffer = base64Data;
    await this.storage.putObject(this.bucket, filename, buffer, {
      'Content-Type': file.mimetype,
    });

    return filename;
  }
  /**
   * Removes an object from the storage bucket.
   * @param url - The URL of the object.
   */
  async remove(url: string) {
    return this.storage.removeObject(this.bucket, url);
  }
  /**
   * Checks if a given value is a valid base64 string.
   * @param value - The value to check.
   * @returns True if the value is a valid base64 string, false otherwise.
   */
  public isBase64(value: string): boolean {
    const base64Regex =
      /^\s*data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(?:[A-Z0-9+/]{4})*(?:[A-Z0-9+/]{2}==|[A-Z0-9+/]{3}=)?\s*$/i;
    return base64Regex.test(value);
  }
  /**
   * Removes the "data:image/..." prefix from a base64 string.
   * @param value - The base64 string.
   * @returns The base64 string without the prefix.
   */
  public formatBase64(value: string) {
    return value.replace(/^data:image\/\w+;base64,/, '');
  }
  /**
   * Gets the file extension from a filename.
   * @param filename - The filename.
   * @returns The file extension.
   */
  private getFileExtension(filename: string) {
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
  }
}
