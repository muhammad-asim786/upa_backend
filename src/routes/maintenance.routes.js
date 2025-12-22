import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import * as maintenanceReportController from '../controllers/maintenanaceReport.controller.js';

const router = express.Router();

router.post('/create-maintenance-report', authenticate, maintenanceReportController.createMaintenanceReportController);
router.get('/get-maintenance-report', authenticate, maintenanceReportController.getMaintenanceReportController);

export default router;