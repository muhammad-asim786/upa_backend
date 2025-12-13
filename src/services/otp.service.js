import Otp from '../models/Otp.js';
import { hashValue, compareHash } from '../utils/hash.js';
import { env } from '../config/env.js';

/**
 * OTP Service
 * Handles OTP generation, storage, validation, and cleanup
 */

/**
 * Generate a 6-digit OTP
 * @returns {string} - 6-digit OTP code
 */
export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Create and store a new OTP for a user
 * Deletes any existing OTP for the user before creating a new one
 * @param {string} userId - User ID (ObjectId)
 * @returns {Promise<{otp: string, expiresAt: Date}>} - The generated OTP and expiration date
 */
export const createOtp = async (userId) => {
  try {
    // Delete any existing OTP for this user
    await Otp.deleteMany({ userId });

    // Generate new 6-digit OTP
    const otp = generateOtp();

    // Hash the OTP before storing
    const otpHash = await hashValue(otp);

    // Calculate expiration time (5 minutes from now)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + env.OTP_EXPIRY_MINUTES);

    // Store hashed OTP in database
    const otpDocument = new Otp({
      userId,
      otpHash,
      expiresAt,
      attempts: 0,
    });

    await otpDocument.save();

    return {
      otp, // Return plain OTP for sending via email
      expiresAt,
    };
  } catch (error) {
    throw new Error(`Error creating OTP: ${error.message}`);
  }
};

/**
 * Verify an OTP for a user
 * @param {string} userId - User ID (ObjectId)
 * @param {string} otp - The OTP code to verify
 * @returns {Promise<{isValid: boolean, message: string}>} - Verification result
 */
export const verifyOtp = async (userId, otp) => {
  try {
    // Find the most recent OTP for this user
    const otpDocument = await Otp.findOne({ userId }).sort({ createdAt: -1 });

    if (!otpDocument) {
      return {
        isValid: false,
        message: 'OTP not found. Please request a new OTP.',
      };
    }

    // Check if OTP has expired
    if (new Date() > otpDocument.expiresAt) {
      // Delete expired OTP
      await Otp.deleteOne({ _id: otpDocument._id });
      return {
        isValid: false,
        message: 'OTP has expired. Please request a new OTP.',
      };
    }

    // Compare provided OTP with hashed OTP
    const isMatch = await compareHash(otp, otpDocument.otpHash);

    if (!isMatch) {
      // Increment attempts counter
      otpDocument.attempts += 1;
      await otpDocument.save();

      return {
        isValid: false,
        message: 'Invalid OTP. Please try again.',
      };
    }

    // OTP is valid - delete it after successful verification
    await Otp.deleteOne({ _id: otpDocument._id });

    return {
      isValid: true,
      message: 'OTP verified successfully.',
    };
  } catch (error) {
    throw new Error(`Error verifying OTP: ${error.message}`);
  }
};

/**
 * Delete OTP for a user
 * @param {string} userId - User ID (ObjectId)
 * @returns {Promise<void>}
 */
export const deleteOtp = async (userId) => {
  try {
    await Otp.deleteMany({ userId });
  } catch (error) {
    throw new Error(`Error deleting OTP: ${error.message}`);
  }
};

export default {
  generateOtp,
  createOtp,
  verifyOtp,
  deleteOtp,
};

