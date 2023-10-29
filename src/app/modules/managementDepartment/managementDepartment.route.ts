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
  ManagementDepartmentController.getSingleManagementDepartment
);

router.get('/', ManagementDepartmentController.getAllManagementDepartments);

router.post(
  '/create-department',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  authGuard(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.SUPER_ADMIN),
  ManagementDepartmentController.createManagementDepartment
);

router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema
  ),
  authGuard(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.SUPER_ADMIN),
  ManagementDepartmentController.updateSingleManagementDepartment
);

router.delete(
  '/:id',
  authGuard(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.SUPER_ADMIN),
  ManagementDepartmentController.deleteManagementDepartment
);

export const ManagementDepartmentRoutes = router;
