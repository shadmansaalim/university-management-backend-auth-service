// Imports
import express from 'express';
import { ENUM_USER_ROLES } from '../../../enums/users';
import authGuard from '../../middlewares/authGuard';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

// Express router
const router = express.Router();

// API Endpoints
router.get('/:id', AcademicDepartmentController.getSingleDepartment);

router.get('/', AcademicDepartmentController.getAllDepartments);

router.post(
  '/create-academic-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  authGuard(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.SUPER_ADMIN),
  AcademicDepartmentController.createDepartment
);

router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  authGuard(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.SUPER_ADMIN),
  AcademicDepartmentController.updateSingleDepartment
);

router.delete(
  '/:id',
  authGuard(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.SUPER_ADMIN),
  AcademicDepartmentController.deleteSingleDepartment
);

export const AcademicDepartmentRoutes = router;
