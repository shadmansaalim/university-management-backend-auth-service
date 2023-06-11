/* eslint-disable no-unused-vars */

// Imports
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFacultyService } from './academicFaculty.service';

// Function that works when create academic faculty POST API hits
const createFaculty = catchAsync(async (req: Request, res: Response) => {
  // Destructuring Academic Faculty data from request body
  const { ...academicFacultyData } = req.body;
  const result = await AcademicFacultyService.createFaculty(
    academicFacultyData
  );

  // Sending API Response
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty created successfully.',
    data: result,
  });
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
