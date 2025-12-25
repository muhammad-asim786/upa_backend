import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import * as patrolReportController from '../controllers/patrol_report.controller.js';

const router = express.Router();

router.post('/create-patrol-report', authenticate, patrolReportController.createPatrolReportController);
router.get('/get-patrol-report', authenticate, patrolReportController.getPatrolReportController);

export default router;

