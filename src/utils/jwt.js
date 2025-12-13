import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

/**
 * JWT utility functions
 * Handles token generation and verification
 */

/**
 * Generate a JWT access token
 * @param {Object} payload - The payload to encode in the token
 * @param {string} expiresIn - Token expiration time (default: 15m)
 * @returns {string} - The generated JWT token
 */
export const generateToken = (payload, expiresIn = env.JWT_EXPIRES_IN) => {
  try {
    const token = jwt.sign(payload, env.JWT_SECRET, {
      expiresIn,
    });
    return token;
  } catch (error) {
    throw new Error(`Error generating token: ${error.message}`);
  }
};

/**
 * Generate a JWT refresh token
 * @param {Object} payload - The payload to encode in the token
 * @param {string} expiresIn - Token expiration time (default: 7d)
 * @returns {string} - The generated refresh token
 */
export const generateRefreshToken = (payload, expiresIn = env.JWT_REFRESH_EXPIRES_IN) => {
  try {
    const token = jwt.sign(payload, env.JWT_REFRESH_SECRET, {
      expiresIn,
    });
    return token;
  } catch (error) {
    throw new Error(`Error generating refresh token: ${error.message}`);
  }
};

/**
 * Verify and decode a JWT access token
 * @param {string} token - The JWT token to verify
 * @returns {Object} - The decoded token payload
 * @throws {Error} - If token is invalid or expired
 */
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token has expired');
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    } else {
      throw new Error(`Error verifying token: ${error.message}`);
    }
  }
};

/**
 * Verify and decode a JWT refresh token
 * @param {string} token - The refresh token to verify
 * @returns {Object} - The decoded token payload
 * @throws {Error} - If token is invalid or expired
 */
export const verifyRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET);
    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Refresh token has expired');
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid refresh token');
    } else {
      throw new Error(`Error verifying refresh token: ${error.message}`);
    }
  }
};

export default {
  generateToken,
  generateRefreshToken,
  verifyToken,
  verifyRefreshToken,
};

