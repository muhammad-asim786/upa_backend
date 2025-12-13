import User from '../models/User.js';

/**
 * User Service
 * Handles user profile operations
 */

/**
 * Get user profile by ID
 * @param {string} userId - User ID (ObjectId)
 * @returns {Promise<Object>} - User profile object (passwordHash excluded)
 */
export const getUserProfile = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Return user without passwordHash (via toJSON method)
    return user.toJSON();
  } catch (error) {
    throw new Error(`Error fetching user profile: ${error.message}`);
  }
};

/**
 * Update user profile
 * @param {string} userId - User ID (ObjectId)
 * @param {Object} updateData - Data to update (name, image)
 * @returns {Promise<Object>} - Updated user profile object (passwordHash excluded)
 */
export const updateUserProfile = async (userId, updateData) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Update allowed fields
    if (updateData.name !== undefined) {
      user.name = updateData.name.trim();
    }

    if (updateData.image !== undefined) {
      user.image = updateData.image.trim();
    }

    // Update timestamp
    user.updatedAt = new Date();

    await user.save();

    // Return updated user without passwordHash
    return user.toJSON();
  } catch (error) {
    throw new Error(`Error updating user profile: ${error.message}`);
  }
};

export default {
  getUserProfile,
  updateUserProfile,
};

