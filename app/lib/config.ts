export const secrets = {
  MONGODB_URI: process.env.MONGODB_URI || '',
  
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || '',
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  
  // Supabase Storage Configuration (FREE - no card required!)
  SUPABASE_URL: process.env.SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || '',
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  SUPABASE_STORAGE_BUCKET: process.env.SUPABASE_STORAGE_BUCKET || 'credflow-files',

  // Cloudflare R2 Configuration (S3-compatible) - Optional
  CLOUDFLARE_R2_ACCESS_KEY_ID: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || '',
  CLOUDFLARE_R2_SECRET_ACCESS_KEY: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || '',
  CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID || '',
  CLOUDFLARE_R2_BUCKET_NAME: process.env.CLOUDFLARE_R2_BUCKET_NAME || '',
  CLOUDFLARE_R2_REGION: process.env.CLOUDFLARE_R2_REGION || 'auto',
  CLOUDFLARE_R2_PUBLIC_URL: process.env.CLOUDFLARE_R2_PUBLIC_URL || '',

  // Backward compatibility for AWS S3 (if someone wants to use S3 instead)
  AWS_ACCESS_KEY_ID: process.env.AWS_S3_ACCESS_KEY_ID || process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || '',
  AWS_SECRET_ACCESS_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY || process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || '',
  AWS_REGION: process.env.AWS_S3_REGION || process.env.CLOUDFLARE_R2_REGION || 'auto',
  AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME || process.env.CLOUDFLARE_R2_BUCKET_NAME || '',

  CDP_API_KEY_ID: process.env.CDP_API_KEY_ID || '',
  CDP_API_KEY_SECRET: process.env.CDP_API_KEY_SECRET || '',
  CDP_Wallet_Secret: process.env.CDP_Wallet_Secret || '',

  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',

  NEXT_PUBLIC_HOST_NAME: process.env.NEXT_PUBLIC_HOST_NAME || '',

  NODE_ENV: process.env.NODE_ENV || 'development',
} as const;

export const validateStorageConfig = (): boolean => {
  // Check if Supabase Storage is configured (RECOMMENDED for students - no card!)
  const hasSupabaseConfig = !!(
    secrets.SUPABASE_URL &&
    secrets.SUPABASE_SERVICE_ROLE_KEY &&
    secrets.SUPABASE_STORAGE_BUCKET
  );

  // Check if Cloudflare R2 is configured
  const hasR2Config = !!(
    secrets.CLOUDFLARE_R2_ACCESS_KEY_ID &&
    secrets.CLOUDFLARE_R2_SECRET_ACCESS_KEY &&
    secrets.CLOUDFLARE_R2_BUCKET_NAME &&
    secrets.CLOUDFLARE_ACCOUNT_ID
  );

  // Check if AWS S3 is configured (backward compatibility)
  const hasS3Config = !!(
    secrets.AWS_ACCESS_KEY_ID &&
    secrets.AWS_SECRET_ACCESS_KEY &&
    secrets.AWS_S3_BUCKET_NAME &&
    secrets.AWS_REGION
  );

  return hasSupabaseConfig || hasR2Config || hasS3Config;
};

// Alias for backward compatibility
export const validateS3Config = validateStorageConfig;

export const validateMongoConfig = (): boolean => {
  return !!secrets.MONGODB_URI;
};

export const validateAuthConfig = (): boolean => {
  return !!secrets.NEXTAUTH_SECRET;
};
