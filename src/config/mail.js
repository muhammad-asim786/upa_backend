import nodemailer from 'nodemailer';
import { env } from './env.js';

/**
 * Email transporter configuration
 * Uses Gmail SMTP for sending emails
 */
export const createTransporter = () => {
  // Validate email credentials
  if (!env.EMAIL_USER || !env.EMAIL_PASS) {
    throw new Error(
      'Email credentials are missing. Please set EMAIL_USER and EMAIL_PASS in your .env file.\n' +
      'For Gmail: Use your Gmail address for EMAIL_USER and generate an App Password for EMAIL_PASS.\n' +
      'Get App Password: Google Account → Security → 2-Step Verification → App Passwords'
    );
  }

  // Validate that credentials are not empty strings
  if (env.EMAIL_USER.trim() === '' || env.EMAIL_PASS.trim() === '') {
    throw new Error(
      'Email credentials cannot be empty. Please set valid EMAIL_USER and EMAIL_PASS in your .env file.\n' +
      'Make sure you are using a Gmail App Password (not your regular password) for EMAIL_PASS.'
    );
  }

  return nodemailer.createTransport({
    host: env.EMAIL_HOST,
    port: parseInt(env.EMAIL_PORT, 10),
    secure: false, // true for 465, false for other ports
    auth: {
      user: env.EMAIL_USER.trim(),
      pass: env.EMAIL_PASS.trim(),
    },
  });
};

export default createTransporter;

