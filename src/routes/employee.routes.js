import express from 'express';

import {authenticate} from '../middleware/auth.middleware.js';
import * as employeeController from '../controllers/employee.controller.js';


const router = express.Router();

router.post("/create-employee", authenticate, employeeController.createEmployeeController
);

router.get("/get-employee", authenticate, employeeController.getEmployeeController)

export default router;