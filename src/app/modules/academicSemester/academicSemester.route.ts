// Imports
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';

// Express router
const router = express.Router();

// API Endpoints
router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema)
);

export const AcademicSemesterRoutes = router;
