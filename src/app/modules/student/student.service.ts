// Imports
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { PaginationHelpers } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';
import { IStudent, IStudentFilters } from './student.interface';
import { StudentConstants } from './student.constant';
import { Student } from './student.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

// GET All Students Function
const getAllStudents = async (
  filters: IStudentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IStudent[]>> => {
  // Destructuring ~ Searching and Filtering
  const { searchTerm, ...filterData } = filters;

  // Storing all searching and filtering condition in this array
  const searchFilterConditions = [];

  // Checking if SEARCH is requested in GET API - adding find conditions
  if (searchTerm) {
    searchFilterConditions.push({
      $or: StudentConstants.searchableFields.map(field => ({
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

  // Condition for finding students
  const findConditions = searchFilterConditions.length
    ? { $and: searchFilterConditions }
    : {};

  // Students
  const result = await Student.find(findConditions)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortingCondition)
    .skip(skip)
    .limit(limit);

  // Count of Student Documents
  const total = await Student.countDocuments(findConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// GET Single Student Function
const getSingleStudent = async (payload: string): Promise<IStudent | null> => {
  const result = await Student.findById(payload)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

// Update Single Student Function
const updateSingleStudent = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  // Checking whether student exists
  const studentExists = await Student.findOne({ id });

  // Throwing error if student not exists
  if (!studentExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }

  // Destructuring
  const { name, guardian, localGuardian, ...studentData } = payload;

  // Storing student data
  const updatedStudentData: Partial<IStudent> = { ...studentData };

  // Dynamically handling update of name, guardian and localGuardian

  if (name && Object.keys(name).length) {
    Object.keys(name).forEach((key: string) => {
      const nameKey = `name.${key}`;
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  if (guardian && Object.keys(guardian).length) {
    Object.keys(guardian).forEach((key: string) => {
      const guardianKey = `name.${key}`;
      (updatedStudentData as any)[guardianKey] =
        guardian[key as keyof typeof guardian];
    });
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    Object.keys(localGuardian).forEach((key: string) => {
      const localGuardianKey = `name.${key}`;
      (updatedStudentData as any)[localGuardianKey] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }

  // Updating student
  const result = await Student.findOneAndUpdate({ id }, updatedStudentData, {
    new: true,
  })
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

export const StudentService = {
  getAllStudents,
  getSingleStudent,
  updateSingleStudent,
};
