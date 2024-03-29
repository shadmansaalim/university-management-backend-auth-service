// Imports
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterService } from './academicSemester.service';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { PaginationConstants } from '../../../constants/pagination';
import { AcademicSemesterConstants } from './academicSemester.constant';

// Function that works when create academic semester POST API hits
const createSemester = catchAsync(async (req: Request, res: Response) => {
  // Destructuring Academic Semester data from request body
  const { ...academicSemesterData } = req.body;
  const result = await AcademicSemesterService.createSemester(
    academicSemesterData
  );

  // Sending API Response
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester created successfully.',
    data: result,
  });
});

// Function to GET All Academic Semesters
const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  // Making a filter options object
  const filters = pick(req.query, AcademicSemesterConstants.filterableFields);

  // Making a pagination options object
  const paginationOptions = pick(req.query, PaginationConstants.fields);

  // Getting all semesters based on request
  const result = await AcademicSemesterService.getAllSemesters(
    filters,
    paginationOptions
  );

  // Sending API Response
  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semesters retrieved successfully.',
    meta: result?.meta,
    data: result?.data,
  });
});

// Function to GET Single Academic Semesters
const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  // Getting semester id from params
  const id = req.params.id;
  const result = await AcademicSemesterService.getSingleSemester(id);

  // Sending API Response
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Academic Semester retrieved successfully.',
    data: result,
  });
});

// Function to update semester
const updateSingleSemester = catchAsync(async (req: Request, res: Response) => {
  // Getting semester id from params
  const id = req.params.id;
  // Getting updated data
  const updatedData = req.body;

  const result = await AcademicSemesterService.updateSingleSemester(
    id,
    updatedData
  );

  // Sending API Response
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester updated successfully.',
    data: result,
  });
});

// Function to delete semester
const deleteSingleSemester = catchAsync(async (req: Request, res: Response) => {
  // Getting semester id from params
  const id = req.params.id;

  const result = await AcademicSemesterService.deleteSingleSemester(id);

  // Sending API Response
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester deleted successfully.',
    data: result,
  });
});

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSingleSemester,
  deleteSingleSemester,
};
