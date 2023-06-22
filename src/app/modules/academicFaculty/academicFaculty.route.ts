// Imports
import express from 'express';
import { ENUM_USER_ROLES } from '../../../enums/users';
import authGuard from '../../middlewares/authGuard';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';

// Express router
const router = express.Router();

// API Endpoints
router.get(
  '/:id',
  authGuard(
    ENUM_USER_ROLES.STUDENT,
    ENUM_USER_ROLES.FACULTY,
    ENUM_USER_ROLES.ADMIN,
    ENUM_USER_ROLES.SUPER_ADMIN
  ),
  AcademicFacultyController.getSingleFaculty
);

router.get(
  '/',
  authGuard(
    ENUM_USER_ROLES.STUDENT,
    ENUM_USER_ROLES.FACULTY,
    ENUM_USER_ROLES.ADMIN,
    ENUM_USER_ROLES.SUPER_ADMIN
  ),
  AcademicFacultyController.getAllFaculties
);

router.post(
  '/create-academic-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  authGuard(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.SUPER_ADMIN),
  AcademicFacultyController.createFaculty
);

router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updateAcademicFacultyZodSchema),
  authGuard(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.SUPER_ADMIN),
  AcademicFacultyController.updateSingleFaculty
);

router.delete(
  '/:id',
  authGuard(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.SUPER_ADMIN),
  AcademicFacultyController.deleteSingleFaculty
);

export const AcademicFacultyRoutes = router;
