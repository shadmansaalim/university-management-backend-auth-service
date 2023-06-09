// Imports
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import { AcademicSemesterConstants } from './academicSemester.constant';
import ApiError from '../../../errors/ApiError';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { PaginationHelpers } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';

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
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  // Destructuring ~ Searching and Filtering
  const { searchTerm } = filters;

  // Search Conditions - Allowing search with title, year and code
  const academicSemesterSearchableFields = ['title', 'year', 'code'];
  const searchConditions = [];

  // If searching requested in GET API - adding search conditions
  if (searchTerm) {
    searchConditions.push({
      $or: academicSemesterSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // Destructuring ~ Pagination and Sorting
  const { page, limit, sortBy, sortOrder, skip } =
    PaginationHelpers.calculatePagination(paginationOptions);

  // Default Sorting Condition
  const sortingCondition: { [key: string]: SortOrder } = {};

  // Adding sort condition if requested
  if (sortBy && sortOrder) {
    sortingCondition[sortBy] = sortOrder;
  }

  // Semesters
  const result = await AcademicSemester.find({ $and: searchConditions })
    .sort(sortingCondition)
    .skip(skip)
    .limit(limit);

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
