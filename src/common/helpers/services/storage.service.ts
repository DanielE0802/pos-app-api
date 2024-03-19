import { ConfigType } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as Minio from 'minio';
import configuration from '../../config/validations/configuration';

@Injectable()
export class StorageService {
  private storage: Minio.Client;

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

  async init() {
    const exists = await this.storage.bucketExists(
      this.config.STORAGE.BUCKET_NAME,
    );

    if (!exists) {
      this.storage.makeBucket(this.config.STORAGE.BUCKET_NAME, (err) => {
        if (err) {
          console.error('minio error ' + err);
        }
      });
    }
  }

  async signedURL(url: string) {
    if (!this.config.STORAGE.IS_ENABLED) {
      return false;
      // return new ServiceUnavailableException().name;
    }

    const EXPIRY_SECONDS = 3600;

    const signedUrl = await this.storage.presignedGetObject(
      this.config.STORAGE.BUCKET_NAME,
      url,
      EXPIRY_SECONDS,
    );

    return signedUrl;
  }

  async upload(file: {
    filename: string;
    base64Data: Buffer;
    mimetype: string;
    subfolder?: string;
  }): Promise<string> {
    if (!this.config.STORAGE.IS_ENABLED) {
      return null;
    }

    let filename = `${randomUUID()}.${this.getFileExtension(file.filename)}`;

    if (file.subfolder) {
      filename = `${file.subfolder}/${filename}`;
    }

    const buffer = file.base64Data;
    await this.storage.putObject(
      this.config.STORAGE.BUCKET_NAME,
      filename,
      buffer,
      { 'Content-Type': file.mimetype },
    );

    return filename;
  }

  // async streamToBuffer(file: FileUpload): Promise<Buffer> {
  //   const stream = await file.createReadStream();
  //   const buffers = [];

  //   return new Promise((resolve, reject) => {
  //     stream.on('data', (data) => {
  //       buffers.push(data);
  //     });

  //     stream.on('end', () => {
  //       const buffer = Buffer.concat(buffers);
  //       resolve(buffer);
  //     });

  //     stream.on('error', (e) => {
  //       reject(e);
  //     });
  //   });
  // }

  async remove(url: string) {
    return this.storage.removeObject(this.config.STORAGE.BUCKET_NAME, url);
  }

  private getFileExtension(filename) {
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
  }
}
