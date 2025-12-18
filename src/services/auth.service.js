import User from "../models/User.js";
import { hashValue, compareHash } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";
import { createOtp } from "./otp.service.js";
import { sendOtpEmail } from "../utils/sendEmail.js";
import { createRefreshToken } from "./refreshToken.service.js";
import Otp from "../models/Otp.js";

/**
 * Authentication Service
 * Handles user registration, OTP verification, password setting, and login
 */

/**m1
 * Register a new user (email only)
 * Generates OTP and sends it via email
 * @param {string} email - User email address
 * @returns {Promise<{user: Object, verificationToken: string}>} - User object and verification token
 */
export const registerUser = async (
  email,
  firstName,
  lastName,
  phoneNumber,
  password
) => {
  try {
    // Normalize email to lowercase
    const normalizedEmail = email.toLowerCase().trim();
    const normalizedFirstName = firstName ? firstName.trim() : "";
    const normalizedLastName = lastName ? lastName.trim() : "";
    const normalizedPhoneNumber = phoneNumber ? phoneNumber.trim() : "";

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      throw new Error(
        "This email is already registered. Please use a different email or login."
      );
    }

    // Hash password
    const passwordHash = await hashValue(password);

    // Create new user
    const user = new User({
      email: normalizedEmail,
      firstName: normalizedFirstName,
      lastName: normalizedLastName,
      phoneNumber: normalizedPhoneNumber,
      passwordHash,
      isVerified: true, 
    });

    await user.save();

    // Generate access token
    const accessToken = generateToken({
      userId: user._id.toString(),
      email: user.email,
    });

    // Generate and store refresh token
    const { token: refreshToken, expiresAt: refreshTokenExpiresAt } =
      await createRefreshToken(user._id);

    return {
      user: {
        _id: user._id,
        email: user.email,
        isVerified: user.isVerified,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
      },
      accessToken,
      refreshToken,
      refreshTokenExpiresAt,
    };
  } catch (error) {
    // If error is already a user-friendly message, throw it as is
    if (
      error.message.includes("already registered") ||
      error.message.includes("already exists")
    ) {
      throw error;
    }
    throw new Error(`Registration failed: ${error.message}`);
  }
};

/**
 * Set password for a user after OTP verification
 * @param {string} userId - User ID (ObjectId)
 * @param {string} password - Plain text password
 * @returns {Promise<Object>} - Updated user object
 */
export const setPassword = async (userId, password) => {
  try {
    // Find user
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.isVerified) {
      throw new Error("User is already verified");
    }

    // Hash password
    const passwordHash = await hashValue(password);

    // Update user
    user.passwordHash = passwordHash;
    user.isVerified = true;
    user.updatedAt = new Date();

    await user.save();

    // Return user without passwordHash
    return user.toJSON();
  } catch (error) {
    throw new Error(`Setting password failed: ${error.message}`);
  }
};

/**
 * Login user with email and password
 * @param {string} email - User email address
 * @param {string} password - Plain text password
 * @returns {Promise<{token: string, user: Object}>} - JWT token and user object
 */
export const loginUser = async (email, password) => {
  try {
    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Find user by email
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Check if user is verified
    if (!user.isVerified) {
      throw new Error("Please verify your email first");
    }

    // Check if user has a password
    if (!user.passwordHash) {
      throw new Error("Password not set. Please set your password first.");
    }

    // Verify password
    const isPasswordValid = await compareHash(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // Update last login timestamp
    user.lastLoginAt = new Date();
    await user.save();

    // Generate JWT access token
    const accessToken = generateToken({
      userId: user._id.toString(),
      email: user.email,
    });

    // Generate and store refresh token
    const { token: refreshToken, expiresAt: refreshTokenExpiresAt } =
      await createRefreshToken(user._id);

    // Return tokens and user (passwordHash excluded via toJSON method)
    return {
      user: user.toJSON(),
      accessToken,
      refreshToken,
      refreshTokenExpiresAt,
     
    };
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
};

/**
 * Get user by ID
 * @param {string} userId - User ID (ObjectId)
 * @returns {Promise<Object>} - User object
 */
export const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

export const sendOtpEmailService = async (email) => {
  try {
    const result = await createOtp(email);
    return result;
  } catch (error) {
    throw new Error(`Error sending OTP email: ${error.message}`);
  }
};

export default {
  registerUser,
  setPassword,
  loginUser,
  getUserById,
  sendOtpEmailService,
};
