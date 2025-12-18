import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import { validate, schemas } from '../middleware/validate.middleware.js';
import { verifyToken } from '../utils/jwt.js';
const router = express.Router();

/**
 * Authentication Routes
 * All routes are prefixed with /auth
 */

// POST /auth/register - Register a new user (email only)
router.post(
  '/register',
  validate(schemas.register),
  authController.register
);

// POST /auth/send-otp-email - Send OTP email
router.post(
  '/send-otp-email',
  validate(schemas.sendOtpEmail),
  authController.sendOtpEmail
);
// POST /auth/verify-otp - Verify OTP code
router.post(
  '/verify-otp',
  validate(schemas.verifyOtp),
  authController.verifyOtpCode
);

// POST /auth/set-password - Set password after OTP verification
router.post(
  '/set-password',
  validate(schemas.setPassword),
  authController.setPassword
);

// POST /auth/login - Login user
router.post(
  '/login',
  validate(schemas.login),
  authController.login
);

// POST /auth/refresh-token - Refresh access token
router.post(
  '/refresh-token',
  validate(schemas.refreshToken),
  authController.refreshToken
);

export default router;


