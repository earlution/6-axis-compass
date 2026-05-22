import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const LOCAL_DIR = process.env.MERCH_ARTWORK_LOCAL_DIR ||
  join(__dirname, '..', 'data', 'artwork');

function getBaseUrl() {
  return (process.env.MERCH_ARTWORK_BASE_URL || '').replace(/\/$/, '');
}

function ensureLocalDir() {
  if (!existsSync(LOCAL_DIR)) mkdirSync(LOCAL_DIR, { recursive: true });
}

async function uploadLocal(buffer, ext = 'png') {
  ensureLocalDir();
  const id = randomUUID();
  const filename = `${id}.${ext}`;
  const filepath = join(LOCAL_DIR, filename);
  writeFileSync(filepath, buffer);
  const base = getBaseUrl();
  if (!base) {
    return { id, filename, url: `/api/artwork/${filename}` };
  }
  return { id, filename, url: `${base}/${filename}` };
}

async function uploadS3(buffer, ext = 'png') {
  const bucket = process.env.MERCH_S3_BUCKET;
  const region = process.env.MERCH_S3_REGION || 'auto';
  const endpoint = process.env.MERCH_S3_ENDPOINT;
  const accessKey = process.env.MERCH_S3_ACCESS_KEY;
  const secretKey = process.env.MERCH_S3_SECRET_KEY;
  const publicBase = getBaseUrl();

  if (!bucket || !accessKey || !secretKey) {
    throw new Error('S3 storage requires MERCH_S3_BUCKET, MERCH_S3_ACCESS_KEY, MERCH_S3_SECRET_KEY');
  }

  const id = randomUUID();
  const key = `artwork/${id}.${ext}`;
  const host = endpoint || `https://${bucket}.s3.${region}.amazonaws.com`;
  const url = `${host.replace(/\/$/, '')}/${key}`;

  const { S3Client, PutObjectCommand } = await import('@aws-sdk/client-s3');
  const client = new S3Client({
    region,
    endpoint: endpoint || undefined,
    credentials: { accessKeyId: accessKey, secretAccessKey: secretKey },
    forcePathStyle: !!endpoint
  });

  await client.send(new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: buffer,
    ContentType: `image/${ext}`,
    ACL: 'public-read'
  }));

  const publicUrl = publicBase ? `${publicBase}/${key}` : url;
  return { id, filename: key, url: publicUrl };
}

export async function uploadArtwork(buffer, ext = 'png') {
  const mode = (process.env.MERCH_ARTWORK_STORAGE || 'local').toLowerCase();
  if (mode === 's3') return uploadS3(buffer, ext);
  return uploadLocal(buffer, ext);
}

export function getLocalArtworkPath(filename) {
  if (!filename || filename.includes('..') || filename.includes('/')) return null;
  const filepath = join(LOCAL_DIR, filename);
  if (!existsSync(filepath)) return null;
  return filepath;
}
