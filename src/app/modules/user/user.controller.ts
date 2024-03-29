// Imports
import { Request, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import httpStatus from 'http-status';

// Function that works when create student POST API hits
const createStudent = catchAsync(async (req: Request, res: Response) => {
  // Getting student and userData  from request body
  const { student, ...userData } = req.body;
  const result = await UserService.createStudent(student, userData);

  // Sending API Response
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully.',
    data: result,
  });
});

// Function that works when create faculty POST API hits
const createFaculty = catchAsync(async (req: Request, res: Response) => {
  // Getting faculty and userData  from request body
  const { faculty, ...userData } = req.body;
  const result = await UserService.createFaculty(faculty, userData);

  // Sending API Response
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully.',
    data: result,
  });
});

// Function that works when create admin POST API hits
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  // Getting admin and userData  from request body
  const { admin, ...userData } = req.body;
  const result = await UserService.createAdmin(admin, userData);

  // Sending API Response
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully.',
    data: result,
  });
});

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
};
