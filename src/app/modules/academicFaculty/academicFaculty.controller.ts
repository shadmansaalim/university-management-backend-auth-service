/* eslint-disable no-unused-vars */

// Imports
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';

// Function that works when create academic faculty POST API hits
const createFaculty = catchAsync(async (req: Request, res: Response) => {
  // Write code here
});

// Function to GET All Academic Faculties
const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  // Write code here
});

// Function to GET Single Academic Faculty
const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  // Write code here
});

// Function to update faculty
const updateSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  // Write code here
});

// Function to delete faculty
const deleteSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  // Write code here
});

export const AcademicFacultyController = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateSingleFaculty,
  deleteSingleFaculty,
};
