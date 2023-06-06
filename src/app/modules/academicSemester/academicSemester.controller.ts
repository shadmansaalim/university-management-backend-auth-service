// Imports
import { Request, Response, NextFunction } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterService } from './academicSemester.service';

// Function that works when create academic semester POST API hits
const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Destructuring Academic Semester data from request body
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );

    next();

    // Sending API Response
    sendResponse<IAcademicSemester>(res, {
      statusCode: 200,
      success: true,
      message: 'Academic Semester created successfully.',
      data: result,
    });
  }
);

export const AcademicSemesterController = {
  createSemester,
};
