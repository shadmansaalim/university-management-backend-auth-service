// Imports
import express from 'express';
import { FacultyController } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyValidation } from './faculty.validation';

// Express router
const router = express.Router();

// API Endpoints
router.get('/:id', FacultyController.getSingleFaculty);

router.get('/', FacultyController.getAllFaculties);

router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  FacultyController.updateSingleFaculty
);

router.delete('/:id', FacultyController.deleteSingleFaculty);

export const FacultyRoutes = router;
