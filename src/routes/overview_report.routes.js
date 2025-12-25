import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import * as overviewReportController from '../controllers/overview_report.controller.js';

const router = express.Router();

router.post('/create-overview-report', authenticate, overviewReportController.createOverviewReportController);
router.get('/get-overview-report', authenticate, overviewReportController.getOverviewReportController);

export default router;

