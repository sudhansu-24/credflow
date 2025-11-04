import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { secrets } from './config';
import * as SupabaseStorage from './supabase-storage';

// Determine which storage provider to use (priority order)
const isUsingSupabase = !!(secrets.SUPABASE_URL && secrets.SUPABASE_SERVICE_ROLE_KEY);
const isUsingR2 = !isUsingSupabase && !!(secrets.CLOUDFLARE_ACCOUNT_ID && secrets.CLOUDFLARE_R2_ACCESS_KEY_ID);
const isUsingS3 = !isUsingSupabase && !isUsingR2 && !!(secrets.AWS_ACCESS_KEY_ID && secrets.AWS_SECRET_ACCESS_KEY);

// Configure S3 client for Cloudflare R2 or AWS S3 (only if not using Supabase)
let s3Client: S3Client | null = null;
let BUCKET_NAME = '';
let STORAGE_TYPE = '';

if (isUsingSupabase) {
  STORAGE_TYPE = 'Supabase';
  BUCKET_NAME = secrets.SUPABASE_STORAGE_BUCKET;
  console.log('Using Supabase Storage');
} else if (isUsingR2 || isUsingS3) {
  const s3ClientConfig: any = {
    region: secrets.AWS_REGION,
    credentials: {
      accessKeyId: secrets.AWS_ACCESS_KEY_ID,
      secretAccessKey: secrets.AWS_SECRET_ACCESS_KEY,
    },
  };

  if (isUsingR2) {
    s3ClientConfig.endpoint = `https://${secrets.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`;
    s3ClientConfig.region = 'auto';
    STORAGE_TYPE = 'R2';
    console.log('✅ Using Cloudflare R2 for storage');
  } else {
    STORAGE_TYPE = 'S3';
    console.log('✅ Using AWS S3 for storage');
  }

  s3Client = new S3Client(s3ClientConfig);
  BUCKET_NAME = secrets.AWS_S3_BUCKET_NAME;
}

export interface UploadResult {
  url: string;
  key: string;
  size: number;
}

export async function uploadFileToS3(
  file: File,
  fileName: string,
  userId: string
): Promise<UploadResult> {
  // Route to Supabase if configured
  if (isUsingSupabase) {
    return SupabaseStorage.uploadFileToSupabase(file, fileName, userId);
  }

  // Otherwise use S3/R2
  if (!s3Client) {
    throw new Error('No storage provider configured. Please set up Supabase, Cloudflare R2, or AWS S3.');
  }

  try {
    const timestamp = Date.now();
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const key = `uploads/${userId}/${timestamp}_${sanitizedFileName}`;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: file?.type,
      ContentLength: file.size,
    };

    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    // Generate the correct URL based on storage type
    let url: string;
    if (isUsingR2) {
      // Use custom domain if configured, otherwise use R2 public URL
      if (secrets.CLOUDFLARE_R2_PUBLIC_URL) {
        url = `${secrets.CLOUDFLARE_R2_PUBLIC_URL}/${key}`;
      } else {
        // R2 public URL format
        url = `https://${BUCKET_NAME}.${secrets.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com/${key}`;
      }
    } else {
      // AWS S3 URL format
      url = `https://${BUCKET_NAME}.s3.${secrets.AWS_REGION}.amazonaws.com/${key}`;
    }

    console.log(`✅ File uploaded to ${STORAGE_TYPE}: ${key}`);

    return {
      url,
      key,
      size: file.size,
    };
  } catch (error) {
    console.error(`Error uploading file to ${STORAGE_TYPE}:`, error);
    throw new Error(`Failed to upload file to ${STORAGE_TYPE}`);
  }
}

export async function deleteFileFromS3(key: string): Promise<void> {
  // Route to Supabase if configured
  if (isUsingSupabase) {
    return SupabaseStorage.deleteFileFromSupabase(key);
  }

  if (!s3Client) {
    throw new Error('No storage provider configured');
  }

  try {
    const deleteCommand = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    await s3Client.send(deleteCommand);
    console.log(`✅ Successfully deleted ${STORAGE_TYPE} file: ${key}`);
  } catch (error) {
    console.error(`Error deleting file from ${STORAGE_TYPE}:`, error);
    throw new Error(`Failed to delete file from ${STORAGE_TYPE}: ${key}`);
  }
}

export async function deleteFileFromS3ByUrl(url: string): Promise<void> {
  // Route to Supabase if configured
  if (isUsingSupabase) {
    return SupabaseStorage.deleteFileFromSupabaseByUrl(url);
  }

  try {
    // Extract key from storage URL (works for S3 and R2)
    const key = extractKeyFromS3Url(url);
    if (!key) {
      throw new Error(`Invalid ${STORAGE_TYPE} URL format`);
    }
    
    await deleteFileFromS3(key);
  } catch (error) {
    console.error(`Error deleting file from ${STORAGE_TYPE} by URL:`, error);
    throw new Error(`Failed to delete file from ${STORAGE_TYPE}: ${url}`);
  }
}

export function extractKeyFromS3Url(url: string): string | null {
  try {
    // Handle Supabase URLs
    if (isUsingSupabase) {
      return SupabaseStorage.extractKeyFromSupabaseUrl(url);
    }

    // Handle different URL formats:
    // AWS S3: https://bucket.s3.region.amazonaws.com/key
    // AWS S3: https://s3.region.amazonaws.com/bucket/key
    // Cloudflare R2: https://bucket.accountid.r2.cloudflarestorage.com/key
    // Custom Domain: https://custom.domain.com/key
    
    const urlObj = new URL(url);
    
    // Format: https://bucket.s3.region.amazonaws.com/key (AWS S3)
    if (urlObj.hostname.includes('.s3.')) {
      return urlObj.pathname.substring(1); // Remove leading slash
    }
    
    // Format: https://s3.region.amazonaws.com/bucket/key (AWS S3 path-style)
    if (urlObj.hostname.startsWith('s3.')) {
      const pathParts = urlObj.pathname.split('/');
      return pathParts.slice(2).join('/'); // Remove empty string and bucket name
    }
    
    // Format: https://bucket.accountid.r2.cloudflarestorage.com/key (Cloudflare R2)
    if (urlObj.hostname.includes('.r2.cloudflarestorage.com')) {
      return urlObj.pathname.substring(1); // Remove leading slash
    }
    
    // Format: Custom domain (check if it matches configured public URL)
    if (secrets.CLOUDFLARE_R2_PUBLIC_URL && url.startsWith(secrets.CLOUDFLARE_R2_PUBLIC_URL)) {
      return urlObj.pathname.substring(1); // Remove leading slash
    }
    
    return null;
  } catch (error) {
    console.error(`Error extracting key from ${STORAGE_TYPE} URL:`, error);
    return null;
  }
}

export async function cleanupOrphanedS3File(uploadResult: UploadResult): Promise<void> {
  // Route to Supabase if configured
  if (isUsingSupabase) {
    return SupabaseStorage.cleanupOrphanedSupabaseFile(uploadResult);
  }

  try {
    console.log(`Attempting to cleanup orphaned ${STORAGE_TYPE} file: ${uploadResult.url}`);
    await deleteFileFromS3(uploadResult.key);
    console.log(`✅ Successfully cleaned up orphaned ${STORAGE_TYPE} file: ${uploadResult.key}`);
  } catch (error) {
    console.error(`Failed to cleanup orphaned ${STORAGE_TYPE} file:`, error);
    // Don't throw here - this is cleanup, we don't want to mask the original error
  }
}

export async function generatePresignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
  // Route to Supabase if configured
  if (isUsingSupabase) {
    return SupabaseStorage.generateSignedUrl(key, expiresIn);
  }

  if (!s3Client) {
    throw new Error('No storage provider configured');
  }

  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn });
    return signedUrl;
  } catch (error) {
    console.error(`Error generating presigned URL for ${STORAGE_TYPE}:`, error);
    throw new Error('Failed to generate presigned URL');
  }
}

export async function downloadFileFromS3(url: string): Promise<Buffer> {
  // Route to Supabase if configured
  if (isUsingSupabase) {
    return SupabaseStorage.downloadFileFromSupabase(url);
  }

  if (!s3Client) {
    throw new Error('No storage provider configured');
  }

  try {
    const key = extractKeyFromS3Url(url);
    if (!key) {
      throw new Error(`Invalid ${STORAGE_TYPE} URL format`);
    }

    const getObjectCommand = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    const response = await s3Client.send(getObjectCommand);
    
    if (!response.Body) {
      throw new Error(`No body in ${STORAGE_TYPE} response`);
    }

    return Buffer.from(await response.Body.transformToByteArray());
  } catch (error) {
    console.error(`Error downloading file from ${STORAGE_TYPE}:`, error);
    throw new Error(`Failed to download file from ${STORAGE_TYPE}: ${url}`);
  }
}

export { validateS3Config, validateStorageConfig } from './config';
