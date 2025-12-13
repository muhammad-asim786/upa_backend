import express from 'express';
import * as userController from '../controllers/user.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validate, schemas } from '../middleware/validate.middleware.js';

const router = express.Router();

/**
 * User Routes
 * All routes are prefixed with /user
 * All routes require authentication
 */

// GET /user/profile - Get user profile
router.get(
  '/profile',
  authenticate,
  userController.getProfile
);

// PUT /user/profile - Update user profile
router.put(
  '/profile',
  authenticate,
  validate(schemas.updateProfile),
  userController.updateProfile
);

export default router;

