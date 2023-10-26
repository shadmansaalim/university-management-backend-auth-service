// Imports
import express from 'express';
import { ENUM_USER_ROLES } from '../../../enums/users';
import authGuard from '../../middlewares/authGuard';
import validateRequest from '../../middlewares/validateRequest';
import { ManagementDepartmentController } from './managementDepartment.controller';
import { ManagementDepartmentValidation } from './managementDepartment.validation';

// Express router
const router = express.Router();

// API Endpoints

router.get(
  '/:id',
  authGuard(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.SUPER_ADMIN),
  ManagementDepartmentController.getSingleManagementDepartment
);

router.get(
  '/',
  authGuard(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.SUPER_ADMIN),
  ManagementDepartmentController.getAllManagementDepartments
);

router.post(
  '/create-management',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  authGuard(ENUM_USER_ROLES.SUPER_ADMIN),
  ManagementDepartmentController.createManagementDepartment
);

router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema
  ),
  authGuard(ENUM_USER_ROLES.SUPER_ADMIN),
  ManagementDepartmentController.updateSingleManagementDepartment
);

export const ManagementDepartmentRoutes = router;
