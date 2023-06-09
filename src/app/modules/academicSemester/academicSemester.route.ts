// Imports
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';

// Express router
const router = express.Router();

// API Endpoints
router.get('/:id', AcademicSemesterController.getSingleSemester);

router.get('/', AcademicSemesterController.getAllSemesters);

router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
);

router.patch('/:id', AcademicSemesterController.updateSingleSemester);

export const AcademicSemesterRoutes = router;
