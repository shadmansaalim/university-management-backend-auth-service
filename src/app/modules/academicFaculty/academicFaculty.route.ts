// Imports
import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';

// Express router
const router = express.Router();

// API Endpoints
router.get('/:id', AcademicFacultyController.getSingleFaculty);

router.get('/', AcademicFacultyController.getAllFaculties);

router.post(
  '/create-academic-faculty',
  AcademicFacultyController.createFaculty
);

router.patch('/:id', AcademicFacultyController.updateSingleFaculty);

router.delete('/:id', AcademicFacultyController.deleteSingleFaculty);

export const AcademicSemesterRoutes = router;
