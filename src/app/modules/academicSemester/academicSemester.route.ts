// Imports
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';
import authGuard from '../../middlewares/authGuard';
import { ENUM_USER_ROLES } from '../../../enums/users';

// Express router
const router = express.Router();

// API Endpoints
router.get('/:id', AcademicSemesterController.getSingleSemester);

router.get('/', AcademicSemesterController.getAllSemesters);

router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  authGuard(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.SUPER_ADMIN),
  AcademicSemesterController.createSemester
);

router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  authGuard(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.SUPER_ADMIN),
  AcademicSemesterController.updateSingleSemester
);

router.delete(
  '/:id',
  authGuard(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.SUPER_ADMIN),
  AcademicSemesterController.deleteSingleSemester
);

export const AcademicSemesterRoutes = router;
