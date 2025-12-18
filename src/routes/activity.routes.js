import express from 'express';
import { authenticate }  from '../middleware/auth.middleware.js';
import * as activityController from '../controllers/activity.controller.js';

const router = express.Router();


router.post('/create-daily-activity', authenticate, activityController.createActivityController)
router.get('/get-daily-activity', authenticate, activityController.getActivityController)
export default router;