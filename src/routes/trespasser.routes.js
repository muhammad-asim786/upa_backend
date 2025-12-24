import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import * as trespasserController from '../controllers/trespasser.controller.js';

const router = express.Router();

router.post('/create-trespasser', authenticate, trespasserController.createTrespasserController);
router.get('/get-trespasser', authenticate, trespasserController.getTrespasserController);

export default router;

