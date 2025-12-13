import * as userService from '../services/user.service.js';

/**
 * User Controller
 * Handles HTTP requests for user profile endpoints
 */

/**
 * Get user profile
 * GET /user/profile
 * Protected route - requires authentication
 */
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await userService.getUserProfile(userId);

    return res.status(200).json({
      success: true,
      message: 'Profile retrieved successfully',
      data: {
        user,
      },
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message || 'Failed to retrieve profile',
    });
  }
};

/**
 * Update user profile
 * PUT /user/profile
 * Protected route - requires authentication
 */
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, image } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (image !== undefined) updateData.image = image;

    const user = await userService.updateUserProfile(userId, updateData);

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || 'Failed to update profile',
    });
  }
};

export default {
  getProfile,
  updateProfile,
};

