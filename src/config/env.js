import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * Environment configuration
 * Validates and exports all required environment variables
 */
export const env = {
  // Server configuration
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Database configuration
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/upa_backend',

  // JWT configuration
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '15m', // Access token expires in 15 minutes
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || 'your-refresh-secret-key-change-in-production',
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '7d', // Refresh token expires in 7 days

  // Email configuration (Gmail SMTP)
  EMAIL_HOST: process.env.EMAIL_HOST || 'smtp.gmail.com',
  EMAIL_PORT: process.env.EMAIL_PORT || 587,
  EMAIL_USER: process.env.EMAIL_USER || '',
  EMAIL_PASS: process.env.EMAIL_PASS || '',

  // OTP configuration
  OTP_EXPIRY_MINUTES: parseInt(process.env.OTP_EXPIRY_MINUTES || '5', 10),
};

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET', 'EMAIL_USER', 'EMAIL_PASS'];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar] && envVar !== 'EMAIL_USER' && envVar !== 'EMAIL_PASS') {
    console.warn(`Warning: ${envVar} is not set. Using default value.`);
  }
}

// Check email credentials on startup
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || 
    process.env.EMAIL_USER.trim() === '' || process.env.EMAIL_PASS.trim() === '') {
  console.warn('\n⚠️  WARNING: Email credentials are not configured!');
  console.warn('   Please set EMAIL_USER and EMAIL_PASS in your .env file');
  console.warn('   Email functionality will not work until credentials are set.\n');
}

export default env;

