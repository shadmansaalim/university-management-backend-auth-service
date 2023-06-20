// Imports
import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidation } from './student.validation';

// Express router
const router = express.Router();

// API Endpoints
router.get('/:id', StudentController.getSingleStudent);

router.get('/', StudentController.getAllStudents);

router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  StudentController.updateSingleStudent
);

router.delete('/:id', StudentController.deleteSingleStudent);

export const StudentRoutes = router;
