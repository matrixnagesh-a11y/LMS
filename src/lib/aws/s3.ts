import { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';

const region = process.env.APP_AWS_REGION || process.env.AWS_REGION || 'ap-southeast-1';
const bucket = process.env.APP_S3_BUCKET_NAME || process.env.AWS_S3_BUCKET_NAME || 'matrix-building-assets-715616248593-ap-southeast-1';
const accessKeyId = process.env.APP_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.APP_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;

export const s3Client = new S3Client({
  region,
  credentials: accessKeyId && secretAccessKey ? {
    accessKeyId,
    secretAccessKey,
  } : undefined,
});

export async function uploadAssetToS3(key: string, body: Buffer | Uint8Array | string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: `matrix-lms/${key}`,
    Body: body,
    ContentType: contentType,
  });

  return await s3Client.send(command);
}

export async function listS3Assets(prefix: string = 'matrix-lms/') {
  const command = new ListObjectsV2Command({
    Bucket: bucket,
    Prefix: prefix,
  });

  return await s3Client.send(command);
}
