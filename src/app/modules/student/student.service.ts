// Imports
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { PaginationHelpers } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';
import { IStudent, IStudentFilters } from './student.interface';
import { StudentConstants } from './student.constant';
import { Student } from './student.model';

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
  // Updating student
  const result = await Student.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

// DELETE Single Student
const deleteSingleStudent = async (id: string): Promise<IStudent | null> => {
  // Deleting student
  const result = await Student.findByIdAndDelete(id)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

export const StudentService = {
  getAllStudents,
  getSingleStudent,
  updateSingleStudent,
  deleteSingleStudent,
};
