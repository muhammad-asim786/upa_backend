import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import * as serviceCallController from '../controllers/service_call.controller.js';

const router = express.Router();

router.post('/create-service-call', authenticate, serviceCallController.createServiceCallController);
router.get('/get-service-call', authenticate, serviceCallController.getServiceCallController);

export default router;

