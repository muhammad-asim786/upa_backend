import RefreshToken from '../models/RefreshToken.js';
import { generateRefreshToken, verifyRefreshToken } from '../utils/jwt.js';
import { env } from '../config/env.js';

/**
 * Refresh Token Service
 * Handles refresh token generation, storage, and validation
 */

/**
 * Create and store a refresh token for a user
 * @param {string} userId - User ID (ObjectId)
 * @returns {Promise<{token: string, expiresAt: Date}>} - The refresh token and expiration date
 */
export const createRefreshToken = async (userId) => {
  try {
    // Revoke all existing refresh tokens for this user
    await RefreshToken.updateMany(
      { userId, isRevoked: false },
      { isRevoked: true }
    );

    // Generate new refresh token
    const tokenPayload = {
      userId: userId.toString(),
      type: 'refresh',
    };

    const token = generateRefreshToken(tokenPayload);

    // Calculate expiration time
    // Parse JWT_REFRESH_EXPIRES_IN (e.g., "7d" = 7 days, "30d" = 30 days)
    const expiresAt = new Date();
    const expiresInStr = env.JWT_REFRESH_EXPIRES_IN || '7d';
    const expiresInMatch = expiresInStr.match(/^(\d+)([dhms])$/);
    
    if (expiresInMatch) {
      const value = parseInt(expiresInMatch[1]);
      const unit = expiresInMatch[2];
      
      switch (unit) {
        case 'd':
          expiresAt.setDate(expiresAt.getDate() + value);
          break;
        case 'h':
          expiresAt.setHours(expiresAt.getHours() + value);
          break;
        case 'm':
          expiresAt.setMinutes(expiresAt.getMinutes() + value);
          break;
        case 's':
          expiresAt.setSeconds(expiresAt.getSeconds() + value);
          break;
        default:
          expiresAt.setDate(expiresAt.getDate() + 7); // Default to 7 days
      }
    } else {
      // If format is not recognized, default to 7 days
      expiresAt.setDate(expiresAt.getDate() + 7);
    }

    // Store refresh token in database
    const refreshTokenDoc = new RefreshToken({
      userId,
      token,
      expiresAt,
      isRevoked: false,
    });

    await refreshTokenDoc.save();

    return {
      token,
      expiresAt,
    };
  } catch (error) {
    throw new Error(`Error creating refresh token: ${error.message}`);
  }
};

/**
 * Verify and validate a refresh token
 * @param {string} token - The refresh token to verify
 * @returns {Promise<{isValid: boolean, userId: string, message: string}>} - Verification result
 */
export const verifyRefreshTokenToken = async (token) => {
  try {
    // Verify JWT token
    const decoded = verifyRefreshToken(token);

    // Check if token exists in database and is not revoked
    const refreshTokenDoc = await RefreshToken.findOne({
      token,
      isRevoked: false,
    });

    if (!refreshTokenDoc) {
      return {
        isValid: false,
        userId: null,
        message: 'Refresh token not found or has been revoked',
      };
    }

    // Check if token has expired (database level check)
    if (new Date() > refreshTokenDoc.expiresAt) {
      // Mark as revoked
      refreshTokenDoc.isRevoked = true;
      await refreshTokenDoc.save();

      return {
        isValid: false,
        userId: null,
        message: 'Refresh token has expired',
      };
    }

    // Verify userId matches
    if (decoded.userId !== refreshTokenDoc.userId.toString()) {
      return {
        isValid: false,
        userId: null,
        message: 'Invalid refresh token',
      };
    }

    return {
      isValid: true,
      userId: refreshTokenDoc.userId.toString(),
      message: 'Refresh token is valid',
    };
  } catch (error) {
    return {
      isValid: false,
      userId: null,
      message: error.message || 'Invalid refresh token',
    };
  }
};

/**
 * Revoke a refresh token
 * @param {string} token - The refresh token to revoke
 * @returns {Promise<void>}
 */
export const revokeRefreshToken = async (token) => {
  try {
    await RefreshToken.updateOne(
      { token },
      { isRevoked: true }
    );
  } catch (error) {
    throw new Error(`Error revoking refresh token: ${error.message}`);
  }
};

/**
 * Revoke all refresh tokens for a user
 * @param {string} userId - User ID (ObjectId)
 * @returns {Promise<void>}
 */
export const revokeAllUserRefreshTokens = async (userId) => {
  try {
    await RefreshToken.updateMany(
      { userId, isRevoked: false },
      { isRevoked: true }
    );
  } catch (error) {
    throw new Error(`Error revoking user refresh tokens: ${error.message}`);
  }
};

export default {
  createRefreshToken,
  verifyRefreshTokenToken,
  revokeRefreshToken,
  revokeAllUserRefreshTokens,
};

