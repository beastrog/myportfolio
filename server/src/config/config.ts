import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Debug information
console.log('\n=== Environment Loading Debug ===');
console.log('Current working directory:', process.cwd());
console.log('Config file location:', __filename);

// Try multiple possible .env file locations
const possibleEnvPaths = [
  path.resolve(process.cwd(), '.env'),                  // Root .env
  path.resolve(process.cwd(), '../.env'),              // Parent directory .env
  path.resolve(__dirname, '../../../.env'),            // Project root .env
];

console.log('\nTrying to load .env from these locations:');
possibleEnvPaths.forEach((p, i) => console.log(`${i + 1}. ${p}`));

// Try to load .env from possible locations
let envLoaded = false;
for (const envPath of possibleEnvPaths) {
  try {
    const result = dotenv.config({ path: envPath, override: true });
    if (!result.error) {
      console.log(`\n✅ Successfully loaded .env from: ${envPath}\n`);
      envLoaded = true;
      break;
    }
  } catch (e: unknown) {
    const error = e as Error;
    console.log(`❌ Failed to load .env from ${envPath}:`, error.message);
  }
}

if (!envLoaded) {
  console.warn('\n⚠️  WARNING: No .env file found. Using default values.\n');
}

// Log environment variables (for debugging)
console.log('=== Environment Variables ===');
console.log('- NODE_ENV:', process.env.NODE_ENV || 'development');
console.log('- PORT:', process.env.PORT || '3001');
console.log('- CORS_ORIGINS:', process.env.CORS_ORIGINS || 'http://localhost:8080,http://localhost:3000');
console.log('- RESEND_API_KEY:', process.env.RESEND_API_KEY ? '***' : 'Not set');
console.log('- EMAIL_FROM:', process.env.EMAIL_FROM || 'undefined');
console.log('- EMAIL_TO:', process.env.EMAIL_TO || 'undefined');
console.log('=============================\n');

interface Config {
  env: string;
  port: number;
  cors: {
    origins: string[];
    credentials: boolean;
  };
  email: {
    from: string;
    to: string;
    resendApiKey: string;
  };
  rateLimit: {
    windowMs: number;
    max: number;
  };
}

const getCorsOrigins = () => {
  if (process.env.NODE_ENV === 'development') {
    return ['http://localhost:8080', 'http://localhost:3000'];
  }
  return process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : [];
};

const config: Config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3001', 10),
  cors: {
    origins: getCorsOrigins(),
    credentials: true
  },
  email: {
    from: process.env.EMAIL_FROM || 'Portfolio Contact <deyaniruddha_goat@yahoo.com>',
    to: process.env.EMAIL_TO || 'deyaniruddha_goat@yahoo.com',
    resendApiKey: process.env.RESEND_API_KEY || ''
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  }
};

// Validate required environment variables in production
if (process.env.NODE_ENV === 'production') {
  if (!config.email.resendApiKey) {
    console.warn('⚠️  WARNING: RESEND_API_KEY is not set. Email functionality will be disabled.');
  }

  if (!config.email.from || !config.email.to) {
    console.warn('⚠️  WARNING: EMAIL_FROM or EMAIL_TO is not properly configured.');
  }
}

export default config;