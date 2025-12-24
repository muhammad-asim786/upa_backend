import express from 'express';
import * as superviseVisitController from '../controllers/supevist.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/create-supervise-visit', authenticate, superviseVisitController.createSuperviseVisitController);
router.get('/get-supervise-visit', authenticate, superviseVisitController.getSuperviseVisitController);

export default router;