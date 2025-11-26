import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3, S3_BUCKET } from '../config/aws';
import { randomUUID } from 'crypto';

export async function uploadToS3(buffer: Buffer, mimeType: string): Promise<string> {
  const fileKey = `products/${randomUUID()}`;

  const command = new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: fileKey,
    Body: buffer,
    ContentType: mimeType,
  });

  await s3.send(command);

  return `https://${S3_BUCKET}.s3.amazonaws.com/${fileKey}`;
}
