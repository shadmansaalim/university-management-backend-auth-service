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

// GET All Semesters Function
const getAllSemesters = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  // Destructuring ~ Searching and Filtering
  const { searchTerm, ...filterData } = filters;

  // Storing all searching and filtering condition in this array
  const searchFilterConditions = [];

  // Checking if SEARCH is requested in GET API - adding find conditions
  if (searchTerm) {
    searchFilterConditions.push({
      $or: AcademicSemesterConstants.searchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // Checking if FILTER is requested in GET API - adding find conditions
  if (Object.keys(filterData).length) {
    searchFilterConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
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

  // Condition for finding semesters
  const findConditions = searchFilterConditions.length
    ? { $and: searchFilterConditions }
    : {};

  // Semesters
  const result = await AcademicSemester.find(findConditions)
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

// GET Single Semester Function
const getSingleSemester = async (
  payload: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(payload);
  return result;
};

// GET Single Semester Function
const updateSingleSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  // Checking whether the format of payload is following the relation consistency of Title and Code
  if (
    payload?.title &&
    payload?.code &&
    payload?.code !== AcademicSemesterConstants.TitleCodeMapper[payload?.title]
  ) {
    throw new ApiError(400, 'Invalid Semester Code Provided');
  }

  // Updating semester
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSingleSemester,
};
