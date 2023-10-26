// Imports
import express from 'express';
import { FacultyController } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyValidation } from './faculty.validation';
import authGuard from '../../middlewares/authGuard';
import { ENUM_USER_ROLES } from '../../../enums/users';

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
  FacultyController.getSingleFaculty
);

router.get(
  '/',
  authGuard(
    ENUM_USER_ROLES.STUDENT,
    ENUM_USER_ROLES.FACULTY,
    ENUM_USER_ROLES.ADMIN,
    ENUM_USER_ROLES.SUPER_ADMIN
  ),
  FacultyController.getAllFaculties
);

router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  authGuard(
    ENUM_USER_ROLES.FACULTY,
    ENUM_USER_ROLES.ADMIN,
    ENUM_USER_ROLES.SUPER_ADMIN
  ),
  FacultyController.updateSingleFaculty
);

router.delete(
  '/:id',
  authGuard(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.SUPER_ADMIN),
  FacultyController.deleteSingleFaculty
);

export const FacultyRoutes = router;
