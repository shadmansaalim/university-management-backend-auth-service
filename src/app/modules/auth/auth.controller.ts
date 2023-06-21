// Imports
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import { ILoginUser } from './auth.interface';
import config from '../../../config';

// Function to LOGIN user
const loginUser = catchAsync(async (req: Request, res: Response) => {
  // Getting login data
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);

  // Separating refreshToken from result data
  const { refreshToken, ...others } = result;

  // Set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  // Sending API Response
  sendResponse<Pick<ILoginUser, 'accessToken' | 'needsPasswordChange'>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully.',
    data: others,
  });
});

export const AuthController = {
  loginUser,
};
