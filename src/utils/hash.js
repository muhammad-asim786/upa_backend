import bcrypt from 'bcrypt';

/**
 * Hash utility functions
 * Provides secure hashing and comparison using bcrypt
 */

/**
 * Hash a value (password or OTP) using bcrypt
 * @param {string} value - The value to hash
 * @returns {Promise<string>} - The hashed value
 */
export const hashValue = async (value) => {
  try {
    const saltRounds = 10;
    const hashedValue = await bcrypt.hash(value, saltRounds);
    return hashedValue;
  } catch (error) {
    throw new Error(`Error hashing value: ${error.message}`);
  }
};

/**
 * Compare a plain value with a hashed value
 * @param {string} plainValue - The plain text value to compare
 * @param {string} hashedValue - The hashed value to compare against
 * @returns {Promise<boolean>} - True if values match, false otherwise
 */
export const compareHash = async (plainValue, hashedValue) => {
  try {
    const isMatch = await bcrypt.compare(plainValue, hashedValue);
    return isMatch;
  } catch (error) {
    throw new Error(`Error comparing hash: ${error.message}`);
  }
};

export default {
  hashValue,
  compareHash,
};

