// Imports
import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';

// Function that works when create user POST API hits
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Destructuring user from request body
    const { user } = req.body;
    const result = await UserService.createUser(user);

    next();

    // Sending API Response
    sendResponse<IUser>(res, {
      statusCode: 200,
      success: true,
      message: 'User created successfully.',
      data: result,
    });
  }
);

export const UserController = {
  createUser,
};
