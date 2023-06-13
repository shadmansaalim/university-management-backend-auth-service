// Imports
import express from 'express';
import { StudentController } from './student.controller';

// Express router
const router = express.Router();

// API Endpoints
router.get('/:id', StudentController.getSingleStudent);

router.get('/', StudentController.getAllStudents);

router.delete('/:id', StudentController.deleteSingleStudent);

export const StudentRoutes = router;
