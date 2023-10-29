// Imports
import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidation } from './student.validation';
import authGuard from '../../middlewares/authGuard';
import { ENUM_USER_ROLES } from '../../../enums/users';

// Express router
const router = express.Router();

// API Endpoints
router.get('/:id', StudentController.getSingleStudent);

router.get('/', StudentController.getAllStudents);

router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  authGuard(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.SUPER_ADMIN),
  StudentController.updateSingleStudent
);

router.delete(
  '/:id',
  authGuard(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.SUPER_ADMIN),
  StudentController.deleteSingleStudent
);

export const StudentRoutes = router;
