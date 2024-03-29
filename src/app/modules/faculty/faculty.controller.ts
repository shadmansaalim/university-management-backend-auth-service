// Imports
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { PaginationConstants } from '../../../constants/pagination';
import { FacultyConstants } from './faculty.constant';
import { IFaculty } from './faculty.interface';
import { FacultyService } from './faculty.service';

// Function to GET All Faculties
const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  // Making a filter options object
  const filters = pick(req.query, FacultyConstants.filterableFields);

  // Making a pagination options object
  const paginationOptions = pick(req.query, PaginationConstants.fields);

  // Getting all faculties based on request
  const result = await FacultyService.getAllFaculties(
    filters,
    paginationOptions
  );

  // Sending API Response
  sendResponse<IFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties retrieved successfully.',
    meta: result?.meta,
    data: result?.data,
  });
});

// Function to GET Single Faculty
const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  // Getting faculty id from params
  const id = req.params.id;
  const result = await FacultyService.getSingleFaculty(id);

  // Sending API Response
  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Faculty retrieved successfully.',
    data: result,
  });
});

// Function to update faculty
const updateSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  // Getting faculty id from params
  const id = req.params.id;
  // Getting updated data
  const updatedData = req.body;

  const result = await FacultyService.updateSingleFaculty(id, updatedData);

  // Sending API Response
  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty updated successfully.',
    data: result,
  });
});

// Function to delete faculty
const deleteSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  // Getting faculty id from params
  const id = req.params.id;

  const result = await FacultyService.deleteSingleFaculty(id);

  // Sending API Response
  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty deleted successfully.',
    data: result,
  });
});

export const FacultyController = {
  getAllFaculties,
  getSingleFaculty,
  updateSingleFaculty,
  deleteSingleFaculty,
};
