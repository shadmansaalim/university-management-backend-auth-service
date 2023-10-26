// Imports
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';
import { AcademicDepartmentConstants } from './academicDepartment.constant';
import getAllDocuments from '../../../shared/getAllDocuments';

// Create Department Function
const createDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  const result = await (
    await AcademicDepartment.create(payload)
  ).populate('academicFaculty');
  return result;
};

// GET All Departments Function
const getAllDepartments = async (
  filters: IAcademicDepartmentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  // Getting all departments
  const { page, limit, total, result } = await getAllDocuments(
    filters,
    paginationOptions,
    AcademicDepartmentConstants.searchableFields,
    AcademicDepartment,
    AcademicDepartmentConstants.fieldsToPopulate
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

// GET Single Department Function
const getSingleDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById(id).populate(
    'academicFaculty'
  );
  return result;
};

// Update Single Department Function
const updateSingleDepartment = async (
  id: string,
  payload: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {
  // Updating department
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  ).populate('academicFaculty');
  return result;
};

// DELETE Single Department
const deleteSingleDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  // Deleting department
  const result = await AcademicDepartment.findByIdAndDelete(id).populate(
    'academicFaculty'
  );
  return result;
};

export const AcademicDepartmentService = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateSingleDepartment,
  deleteSingleDepartment,
};
