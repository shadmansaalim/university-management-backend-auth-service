/* eslint-disable no-unused-vars */

// Imports
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import { AcademicSemesterConstants } from './academicSemester.constant';
import ApiError from '../../../errors/ApiError';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { PaginationConstants } from '../../../constants/pagination';
import { IGenericResponse } from '../../../interfaces/common';

// Create Semester Function
const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  // Checking whether the format of payload is following the relation consistency of Title and Code
  if (
    payload?.code !== AcademicSemesterConstants.TitleCodeMapper[payload?.title]
  ) {
    throw new ApiError(400, 'Invalid Semester Code Provided');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

// GET Semesters Function
const getAllSemesters = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  // Destructuring
  const {
    page = PaginationConstants.DEFAULT_PAGE,
    limit = PaginationConstants.DEFAULT_LIMIT,
  } = paginationOptions;

  // Number of data (semesters) to skip
  const skip = (page - 1) * limit;

  // Semesters
  const result = await AcademicSemester.find().sort().skip(skip).limit(limit);

  // Total Semester Documents in Database
  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
};
