// Imports
import express from 'express';
import { AdminController } from './admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidation } from './admin.validation';

// Express router
const router = express.Router();

// API Endpoints
router.get('/:id', AdminController.getSingleAdmin);

router.get('/', AdminController.getAllAdmins);

router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdminZodSchema),
  AdminController.updateSingleAdmin
);

export const AdminRoutes = router;
