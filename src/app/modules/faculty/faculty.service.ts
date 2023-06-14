// Imports
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import getAllDocuments from '../../../shared/getAllDocuments';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import { FacultyConstants } from './faculty.constant';
import { Faculty } from './faculty.model';

// GET All Faculties Function
const getAllFaculties = async (
  filters: IFacultyFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFaculty[]>> => {
  // Getting all faculties
  const { page, limit, total, result } = await getAllDocuments(
    filters,
    paginationOptions,
    FacultyConstants.searchableFields,
    Faculty,
    FacultyConstants.fieldsToPopulate
  );

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// GET Single Faculty Function
const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findOne({ id })
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

// Update Single Faculty Function
const updateSingleFaculty = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  // Checking whether faculty exists
  const facultyExists = await Faculty.findOne({ id });

  // Throwing error if faculty not exists
  if (!facultyExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found');
  }

  // Destructuring
  const { name, ...facultyData } = payload;

  // Storing faculty data
  const updatedFacultyData: Partial<IFaculty> = { ...facultyData };

  // Dynamically handling update of name

  if (name && Object.keys(name).length) {
    Object.keys(name).forEach((key: string) => {
      const nameKey = `name.${key}`;
      (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  // Updating faculty
  const result = await Faculty.findOneAndUpdate({ id }, updatedFacultyData, {
    new: true,
  })
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

export const FacultyService = {
  getAllFaculties,
  getSingleFaculty,
  updateSingleFaculty,
};
