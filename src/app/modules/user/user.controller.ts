// Imports
import { Request, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import httpStatus from 'http-status';

// Function that works when create user POST API hits
const createUser = catchAsync(async (req: Request, res: Response) => {
  // Getting user from request body
  const user = req.body;
  const result = await UserService.createUser(user);

  // Sending API Response
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully.',
    data: result,
  });
});

export const UserController = {
  createUser,
};
