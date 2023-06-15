// Imports
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ManagementDepartmentController } from './managementDepartment.controller';
import { ManagementDepartmentValidation } from './managementDepartment.validation';

// Express router
const router = express.Router();

// API Endpoints

router.get(
  '/:id',
  ManagementDepartmentController.getSingleManagementDepartment
);

router.get('/', ManagementDepartmentController.getAllManagementDepartments);

router.post(
  '/create-management',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.createManagementDepartment
);

router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.updateSingleManagementDepartment
);

export const ManagementDepartmentRoutes = router;
