// Imports
import express from 'express';
import { ENUM_USER_ROLES } from '../../../enums/users';
import authGuard from '../../middlewares/authGuard';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

// Express router
const router = express.Router();

// API Endpoints
router.post(
  '/create-student',
  validateRequest(UserValidation.createStudentZodSchema),
  authGuard(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.SUPER_ADMIN),
  UserController.createStudent
);

router.post(
  '/create-faculty',
  validateRequest(UserValidation.createFacultyZodSchema),
  authGuard(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.SUPER_ADMIN),
  UserController.createFaculty
);

router.post(
  '/create-admin',
  validateRequest(UserValidation.createAdminZodSchema),
  authGuard(ENUM_USER_ROLES.SUPER_ADMIN),
  UserController.createAdmin
);

export const UserRoutes = router;
