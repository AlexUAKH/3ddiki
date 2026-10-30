import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { extname } from 'path';

@Injectable()
export class R2StorageService {
  private readonly bucket = process.env.R2_BUCKET_NAME!;
  private readonly publicUrl = process.env.R2_PUBLIC_URL!.replace(/\/$/, '');

  private readonly client = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  });

  async uploadImage(file: Express.Multer.File, folderName: string = 'common') {
    const key = `${folderName}/${randomUUID()}${extname(file.originalname).toLowerCase()}`;

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return {
      key,
      url: `${this.publicUrl}/${key}`,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
    };
  }

  async deleteImage(key: string) {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      }),
    );
  }
}
