// Imports
import { Request, Response, NextFunction } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterService } from './academicSemester.service';
import httpStatus from 'http-status';

// Function that works when create academic semester POST API hits
const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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

    next();
  }
);

export const AcademicSemesterController = {
  createSemester,
};
