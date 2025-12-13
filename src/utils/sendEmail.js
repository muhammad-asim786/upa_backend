import createTransporter from '../config/mail.js';
import { env } from '../config/env.js';

/**
 * Email utility functions
 * Handles sending emails using nodemailer
 */

/**
 * Send an email using nodemailer
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} html - Email HTML content
 * @returns {Promise<Object>} - Email sending result
 */
export const sendEmail = async (to, subject, html) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"UPA Backend" <${env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to ${to}: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`❌ Error sending email to ${to}:`, error.message);
    
    // Provide specific troubleshooting for Gmail authentication errors
    if (error.message.includes('Invalid login') || error.message.includes('535') || error.message.includes('BadCredentials')) {
      const troubleshooting = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ GMAIL AUTHENTICATION ERROR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Common causes and solutions:

1. ❌ Using regular Gmail password
   ✅ SOLUTION: You MUST use a Gmail App Password, not your regular password
   
2. ❌ App Password has spaces
   ✅ SOLUTION: Remove all spaces from the App Password in your .env file
   Example: "abcd efgh ijkl mnop" → "abcdefghijklmnop"
   
3. ❌ 2-Step Verification not enabled
   ✅ SOLUTION: Enable 2-Step Verification first, then generate App Password
   Link: https://myaccount.google.com/security
   
4. ❌ Wrong email address
   ✅ SOLUTION: Make sure EMAIL_USER matches the Gmail account exactly
   
5. ❌ App Password expired or revoked
   ✅ SOLUTION: Generate a new App Password from Google Account settings

📋 STEP-BY-STEP FIX:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Go to: https://myaccount.google.com/security
2. Enable "2-Step Verification" (if not already enabled)
3. Click "App Passwords" (under 2-Step Verification)
4. Select "Mail" and "Other (Custom name)" → Enter "UPA Backend"
5. Click "Generate"
6. Copy the 16-character password (remove spaces!)
7. Update your .env file:
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=abcdefghijklmnop  (no spaces!)
8. Restart your server

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
      console.error(troubleshooting);
    }
    
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

/**
 * Send OTP email to user
 * @param {string} email - Recipient email address
 * @param {string} otp - The 6-digit OTP code
 * @returns {Promise<Object>} - Email sending result
 */
export const sendOtpEmail = async (email, otp) => {
  const subject = 'Your OTP Verification Code';
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        .otp-code {
          font-size: 32px;
          font-weight: bold;
          text-align: center;
          letter-spacing: 5px;
          color: #007bff;
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 5px;
          margin: 20px 0;
        }
        .footer {
          margin-top: 20px;
          font-size: 12px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>OTP Verification Code</h2>
        <p>Hello,</p>
        <p>Your OTP verification code is:</p>
        <div class="otp-code">${otp}</div>
        <p>This code will expire in 5 minutes.</p>
        <p>If you didn't request this code, please ignore this email.</p>
        <div class="footer">
          <p>Best regards,<br>UPA Backend Team</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail(email, subject, html);
};

export default {
  sendEmail,
  sendOtpEmail,
};

