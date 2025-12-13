import { verifyToken } from '../utils/jwt.js';

/**
 * Authentication Middleware
 * Validates JWT token and attaches user information to request
 */

/**
 * Middleware to authenticate requests using JWT
 * Extracts token from Authorization header and validates it
 * Attaches userId to req.user
 */
export const authenticate = async (req, res, next) => {
  try {
    console.log("received request :", req.body);
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Authorization header is missing',
      });
    }

    // Extract token from "Bearer <token>" format
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.substring(7)
      : authHeader;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token is missing',
      });
    }

    // Verify token
    const decoded = verifyToken(token);

    // Attach user information to request
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || 'Invalid or expired token',
    });
  }
};

export default authenticate;

