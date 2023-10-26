// Imports
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
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
  sendResponse<Pick<ILoginUserResponse, 'accessToken' | 'needsPasswordChange'>>(
    res,
    {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User logged in successfully.',
      data: others,
    }
  );
});

// Function for refresh token
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  // Set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  // Sending API Response
  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Refresh token generated successfully.',
    data: result,
  });
});

// Function for change password
const changePassword = catchAsync(async (req: Request, res: Response) => {
  // User
  const user = req.user;

  // Getting password data
  const { ...passwordData } = req.body;

  await AuthService.changePassword(user, passwordData);

  // Sending API Response
  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully.',
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
};
