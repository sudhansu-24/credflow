import { createClient } from '@supabase/supabase-js';
import { secrets } from './config';

// Initialize Supabase client
const supabase = secrets.SUPABASE_URL && secrets.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(secrets.SUPABASE_URL, secrets.SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null;

const BUCKET_NAME = secrets.SUPABASE_STORAGE_BUCKET;

export interface UploadResult {
  url: string;
  key: string;
  size: number;
}

/**
 * Upload file to Supabase Storage
 */
export async function uploadFileToSupabase(
  file: File,
  fileName: string,
  userId: string
): Promise<UploadResult> {
  if (!supabase) {
    throw new Error('Supabase client not initialized. Check your environment variables.');
  }

  try {
    const timestamp = Date.now();
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const key = `uploads/${userId}/${timestamp}_${sanitizedFileName}`;

    // Convert to a Node-friendly buffer for server uploads
    const bytes = await file.arrayBuffer();
    const fileBuffer = new Uint8Array(bytes);

    // Retry upload a couple of times to avoid transient network hiccups
    let lastError: any = null;
    for (let attempt = 1; attempt <= 2; attempt++) {
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(key, fileBuffer, {
          contentType: file.type,
          upsert: false,
        });
      if (!error) {
        // Get public URL
        const { data: urlData } = supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(key);

        console.log(`✅ File uploaded to Supabase: ${key} (attempt ${attempt})`);

        return {
          url: urlData.publicUrl,
          key: key,
          size: file.size,
        };
      }
      lastError = error;
      console.warn(`Supabase upload attempt ${attempt} failed:`, error?.message || error);
      await new Promise(r => setTimeout(r, 1000));
    }

    // If all attempts failed, surface the last error
    console.error('Supabase upload error:', lastError);
    throw new Error(`Failed to upload file: ${lastError?.message || 'unknown error'}`);
  } catch (error) {
    console.error('Error uploading file to Supabase:', error);
    throw new Error(`Failed to upload file to Supabase: ${error}`);
  }
}

/**
 * Delete file from Supabase Storage
 */
export async function deleteFileFromSupabase(key: string): Promise<void> {
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }

  try {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([key]);

    if (error) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }

    console.log(`✅ Successfully deleted Supabase file: ${key}`);
  } catch (error) {
    console.error('Error deleting file from Supabase:', error);
    throw new Error(`Failed to delete file from Supabase: ${key}`);
  }
}

/**
 * Delete file from Supabase by URL
 */
export async function deleteFileFromSupabaseByUrl(url: string): Promise<void> {
  const key = extractKeyFromSupabaseUrl(url);
  if (!key) {
    throw new Error('Invalid Supabase URL format');
  }
  
  await deleteFileFromSupabase(key);
}

/**
 * Extract key from Supabase Storage URL
 */
export function extractKeyFromSupabaseUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    
    // Supabase URL format: https://[project-id].supabase.co/storage/v1/object/public/[bucket]/[key]
    const pathMatch = urlObj.pathname.match(/\/storage\/v1\/object\/public\/[^/]+\/(.+)/);
    if (pathMatch) {
      return pathMatch[1];
    }
    
    return null;
  } catch (error) {
    console.error('Error extracting key from Supabase URL:', error);
    return null;
  }
}

/**
 * Download file from Supabase Storage
 */
export async function downloadFileFromSupabase(url: string): Promise<Buffer> {
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }

  try {
    const key = extractKeyFromSupabaseUrl(url);
    if (!key) {
      throw new Error('Invalid Supabase URL format');
    }

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .download(key);

    if (error) {
      throw new Error(`Failed to download file: ${error.message}`);
    }

    if (!data) {
      throw new Error('No data in Supabase response');
    }

    const arrayBuffer = await data.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error('Error downloading file from Supabase:', error);
    throw new Error(`Failed to download file from Supabase: ${url}`);
  }
}

/**
 * Cleanup orphaned Supabase file
 */
export async function cleanupOrphanedSupabaseFile(uploadResult: UploadResult): Promise<void> {
  try {
    console.log(`Attempting to cleanup orphaned Supabase file: ${uploadResult.url}`);
    await deleteFileFromSupabase(uploadResult.key);
    console.log(`✅ Successfully cleaned up orphaned Supabase file: ${uploadResult.key}`);
  } catch (error) {
    console.error('Failed to cleanup orphaned Supabase file:', error);
    // Don't throw here - this is cleanup, we don't want to mask the original error
  }
}

/**
 * Generate signed URL for temporary access (for private buckets)
 */
export async function generateSignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }

  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(key, expiresIn);

    if (error) {
      throw new Error(`Failed to generate signed URL: ${error.message}`);
    }

    if (!data?.signedUrl) {
      throw new Error('No signed URL in response');
    }

    return data.signedUrl;
  } catch (error) {
    console.error('Error generating signed URL for Supabase:', error);
    throw new Error('Failed to generate signed URL');
  }
}

export { validateStorageConfig } from './config';

