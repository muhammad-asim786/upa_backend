import express from 'express';
import * as dashboardController from '../controllers/dashboard.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();


/**
 * Dashboard Routes
 * All routes are prefixed with /dashboard
 */

// POST /dashboard/store-dashboard-data - Store dashboard data
router.post(
  '/store-dashboard-data',
  authenticate,
  dashboardController.storeDashboardData
);

// GET /dashboard/get-dashboard-data - Get dashboard data
router.get(
  '/get-dashboard-data',
  authenticate,
  dashboardController.getDashboardData
);

export default router;