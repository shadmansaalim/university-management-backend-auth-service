// Imports
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { PaginationConstants } from '../../../constants/pagination';
import { StudentConstants } from './student.constant';
import { IStudent } from './student.interface';
import { StudentService } from './student.service';

// Function to GET All Students
const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  // Making a filter options object
  const filters = pick(req.query, StudentConstants.filterableFields);

  // Making a pagination options object
  const paginationOptions = pick(req.query, PaginationConstants.fields);

  // Getting all students based on request
  const result = await StudentService.getAllStudents(
    filters,
    paginationOptions
  );

  // Sending API Response
  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students retrieved successfully.',
    meta: result?.meta,
    data: result?.data,
  });
});

// Function to GET Single Student
const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  // Getting student id from params
  const id = req.params.id;
  const result = await StudentService.getSingleStudent(id);

  // Sending API Response
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Student retrieved successfully.',
    data: result,
  });
});

// Function to update student
const updateSingleStudent = catchAsync(async (req: Request, res: Response) => {
  // Getting student id from params
  const id = req.params.id;
  // Getting updated data
  const updatedData = req.body;

  const result = await StudentService.updateSingleStudent(id, updatedData);

  // Sending API Response
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated successfully.',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  updateSingleStudent,
};
