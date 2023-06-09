// Imports
import { Request, Response, NextFunction } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterService } from './academicSemester.service';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { PaginationConstants } from '../../../constants/pagination';
import { AcademicSemesterConstants } from './academicSemester.constant';

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

// Function to GET Academic Semesters
const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Making a filter options object
    const filters = pick(req.query, AcademicSemesterConstants.filterableFields);

    // Making a pagination options object
    const paginationOptions = pick(req.query, PaginationConstants.fields);

    // Getting all semesters based on request
    const result = await AcademicSemesterService.getAllSemesters(
      filters,
      paginationOptions
    );

    // Sending API Response
    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semesters retrieved successfully.',
      meta: result?.meta,
      data: result?.data,
    });

    next();
  }
);

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
};
