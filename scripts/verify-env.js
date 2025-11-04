#!/usr/bin/env node

/**
 * Credflow Environment Variables Verification Script
 * Run this to check if all required environment variables are properly set
 */

// Load .env.local first (Next.js convention), then .env
require('dotenv').config({ path: '.env.local' });
require('dotenv').config();

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(colors[color] + message + colors.reset);
}

function checkEnv(name, required = true, description = '') {
  const value = process.env[name];
  const exists = !!value;
  const status = exists ? '✓' : (required ? '✗' : '○');
  const statusColor = exists ? 'green' : (required ? 'red' : 'yellow');
  
  log(`  ${status} ${name}`, statusColor);
  if (description) {
    log(`    ${description}`, 'cyan');
  }
  if (!exists && required) {
    log(`    MISSING: This is required!`, 'red');
  }
  if (exists && (value.includes('your-') || value.includes('generate-'))) {
    log(`    WARNING: Still using placeholder value`, 'yellow');
    return false;
  }
  
  return exists;
}

console.log('\n' + '='.repeat(60));
log('CREDFLOW - Environment Variables Verification', 'blue');
console.log('='.repeat(60) + '\n');

let allRequired = true;
let warnings = 0;

// Database Configuration
log('📦 DATABASE CONFIGURATION', 'cyan');
allRequired &= checkEnv('MONGODB_URI', true, 'MongoDB connection string');
console.log();

// Authentication
log('🔐 AUTHENTICATION (NextAuth)', 'cyan');
allRequired &= checkEnv('NEXTAUTH_SECRET', true, 'Generate with: openssl rand -base64 32');
allRequired &= checkEnv('NEXTAUTH_URL', true, 'Application URL (default: http://localhost:3000)');
console.log();

// Storage Configuration (check for either Supabase OR Cloudflare R2)
log('📦 STORAGE CONFIGURATION', 'cyan');
log('  Choose ONE storage option:', 'yellow');
console.log();

// Check Supabase (RECOMMENDED for students)
log('  Option 1: Supabase Storage (RECOMMENDED - No card!)', 'green');
const hasSupabaseURL = checkEnv('SUPABASE_URL', false, 'Supabase Project URL');
const hasSupabaseServiceKey = checkEnv('SUPABASE_SERVICE_ROLE_KEY', false, 'Supabase Service Role Key');
checkEnv('SUPABASE_ANON_KEY', false, 'Supabase Anon Key (for frontend)');
checkEnv('SUPABASE_STORAGE_BUCKET', false, 'Storage bucket name (default: credflow-files)');
const hasSupabase = hasSupabaseURL && hasSupabaseServiceKey;

console.log();

// Check Cloudflare R2 (requires card)
log('  Option 2: Cloudflare R2 (Requires card)', 'yellow');
const hasR2AccessKey = checkEnv('CLOUDFLARE_R2_ACCESS_KEY_ID', false, 'R2 Access Key ID');
const hasR2SecretKey = checkEnv('CLOUDFLARE_R2_SECRET_ACCESS_KEY', false, 'R2 Secret Access Key');
const hasR2AccountId = checkEnv('CLOUDFLARE_ACCOUNT_ID', false, 'Cloudflare Account ID');
checkEnv('CLOUDFLARE_R2_BUCKET_NAME', false, 'R2 Bucket name');
const hasR2 = hasR2AccessKey && hasR2SecretKey && hasR2AccountId;

console.log();

// At least one storage must be configured
if (!hasSupabase && !hasR2) {
  log('  ❌ ERROR: No storage configured!', 'red');
  log('  Please set up either Supabase or Cloudflare R2', 'red');
  allRequired = false;
} else if (hasSupabase) {
  log('  ✅ Using Supabase Storage', 'green');
} else if (hasR2) {
  log('  ✅ Using Cloudflare R2 Storage', 'green');
}
console.log();

// Coinbase CDP
log('💰 COINBASE CDP (Wallet & Payments)', 'cyan');
allRequired &= checkEnv('CDP_API_KEY_ID', true, 'Coinbase CDP API Key ID');
allRequired &= checkEnv('CDP_API_KEY_SECRET', true, 'Coinbase CDP API Key Secret');
allRequired &= checkEnv('CDP_WALLET_SECRET', true, 'Coinbase CDP Wallet Secret');
console.log();

// OpenAI
log('🤖 OPENAI API (AI Features)', 'cyan');
allRequired &= checkEnv('OPENAI_API_KEY', true, 'OpenAI API Key (starts with sk-)');
console.log();

// Application Settings
log('⚙️  APPLICATION SETTINGS', 'cyan');
checkEnv('NEXT_PUBLIC_HOST_NAME', false, 'Public hostname');
checkEnv('NODE_ENV', false, 'Node environment (development/production)');
console.log();

// Summary
console.log('='.repeat(60));
if (allRequired && warnings === 0) {
  log('✅ ALL REQUIRED ENVIRONMENT VARIABLES ARE SET!', 'green');
  log('\nYou can now run: npm run dev', 'cyan');
} else if (allRequired) {
  log('⚠️  All required variables set, but some warnings found', 'yellow');
  log('Please review the warnings above', 'yellow');
} else {
  log('❌ MISSING REQUIRED ENVIRONMENT VARIABLES', 'red');
  log('\nPlease check SETUP_GUIDE.md for instructions', 'yellow');
  process.exit(1);
}
console.log('='.repeat(60) + '\n');

// Additional recommendations
log('💡 RECOMMENDATIONS:', 'blue');
log('  1. Never commit .env file to git', 'cyan');
log('  2. Use strong, unique secrets for production', 'cyan');
log('  3. Rotate API keys regularly', 'cyan');
log('  4. Monitor Cloudflare R2 usage (though it\'s free!)', 'cyan');
log('  5. Check OpenAI API usage and set limits', 'cyan');
console.log();

