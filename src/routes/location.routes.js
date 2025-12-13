import express from 'express';
import {authenticate} from '../middleware/auth.middleware.js';
import * as locationController from '../controllers/location.controller.js';   

const router = express.Router();

router.post('/create-location', authenticate, locationController.createLocationController)

router.get('/get-location', authenticate, locationController.getLocationController)

export default router;