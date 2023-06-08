/* eslint-disable no-unused-vars */

// Imports
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import { AcademicSemesterConstants } from './academicSemester.constant';
import ApiError from '../../../errors/ApiError';
import { IPaginationOptions } from '../../../interfaces/pagination';

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
): Promise<IAcademicSemester[]> => {
  // Returning empty array now but will remove later
  return [];
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
};
