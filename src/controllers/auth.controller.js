import * as authService from '../services/auth.service.js';
import { verifyOtp } from '../services/otp.service.js';
import { verifyToken, generateToken } from '../utils/jwt.js';
import { verifyRefreshTokenToken, revokeRefreshToken, createRefreshToken } from '../services/refreshToken.service.js';

/**
 * Authentication Controller
 * Handles HTTP requests for authentication endpoints
 */

/**
 * Register a new user
 * POST /auth/register
 */
export const register = async (req, res) => {
  try {
    const { email, firstName, lastName, phoneNumber, password } = req.body;

    const result = await authService.registerUser(email, firstName, lastName, phoneNumber, password);
    

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        refreshTokenExpiresAt: result.refreshTokenExpiresAt,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || 'Registration failed',
    });
  }
};

/**
 * Verify OTP
 * POST /auth/verify-otp
 */
export const verifyOtpCode = async (req, res) => {
  try {
    const { otp, verificationToken } = req.body;

    // Decode verification token to get userId
    let decoded;
    try {
      decoded = verifyToken(verificationToken);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired verification token',
      });
    }

    const userId = decoded.userId;

    // Verify OTP
    const verificationResult = await verifyOtp(userId, otp);

    if (!verificationResult.isValid) {
      return res.status(400).json({
        success: false,
        message: verificationResult.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'OTP verified successfully. You can now set your password.',
      data: {
        verificationToken, // Return same token for setting password
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || 'OTP verification failed',
    });
  }
};

/**
 * Set password after OTP verification
 * POST /auth/set-password
 */
export const setPassword = async (req, res) => {
  try {
    const { password, verificationToken } = req.body;

    // Decode verification token to get userId
    let decoded;
    try {
      decoded = verifyToken(verificationToken);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired verification token',
      });
    }

    const userId = decoded.userId;

    // Set password
    const user = await authService.setPassword(userId, password);

    return res.status(200).json({
      success: true,
      message: 'Password set successfully. You can now login.',
      data: {
        user,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || 'Setting password failed',
    });
  }
};

/**
 * Login user
 * POST /auth/login
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authService.loginUser(email, password);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        refreshTokenExpiresAt: result.refreshTokenExpiresAt,
        user: result.user,
      },
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || 'Login failed',
    });
  }
};

/**
 * Refresh access token using refresh token
 * POST /auth/refresh-token
 */
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken: token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required',
      });
    }

    // Verify refresh token
    const verificationResult = await verifyRefreshTokenToken(token);

    if (!verificationResult.isValid) {
      return res.status(401).json({
        success: false,
        message: verificationResult.message || 'Invalid or expired refresh token',
      });
    }

    // Get user
    const user = await authService.getUserById(verificationResult.userId);

    // Revoke old refresh token
    await revokeRefreshToken(token);

    // Generate new access token
    const accessToken = generateToken({
      userId: user._id.toString(),
      email: user.email,
    });

    // Generate new refresh token
    const { token: newRefreshToken, expiresAt: refreshTokenExpiresAt } = await createRefreshToken(user._id);

    return res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        accessToken,
        refreshToken: newRefreshToken,
        refreshTokenExpiresAt,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || 'Failed to refresh token',
    });
  }
};

export default {
  register,
  verifyOtpCode,
  setPassword,
  login,
  refreshToken,
};

