import express from 'express';
import { authenticate }  from '../middleware/auth.middleware.js';
import * as incidentReportController from '../controllers/incident.controller.js';

const router = express.Router();


router.post('/create-incident-report', authenticate, incidentReportController.createIncidentReportController)
router.get('/get-incident-report', authenticate, incidentReportController.getIncidentReportController)
export default router;  