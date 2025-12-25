import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import * as useOfForceReportController from '../controllers/use_of_force_report.controller.js';

const router = express.Router();

router.post('/create-use-of-force-report', authenticate, useOfForceReportController.createUseOfForceReportController);
router.get('/get-use-of-force-report', authenticate, useOfForceReportController.getUseOfForceReportController);

export default router;

