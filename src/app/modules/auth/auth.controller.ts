// Imports
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import { ILoginUser } from './auth.interface';

// Function to LOGIN user
const loginUser = catchAsync(async (req: Request, res: Response) => {
  // Getting login data
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);

  // Sending API Response
  sendResponse<ILoginUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully.',
    data: result,
  });
});

export const AuthController = {
  loginUser,
};
