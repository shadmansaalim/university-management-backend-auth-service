// Imports
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import getAllDocuments from '../../../shared/getAllDocuments';
import {
  IManagementDepartment,
  IManagementDepartmentFilters,
} from './managementDepartment.interface';
import { ManagementDepartment } from './managementDepartment.model';
import { ManagementDepartmentConstants } from './managementDepartment.constant';

// Create Management Department Function
const createManagementDepartment = async (
  payload: IManagementDepartment
): Promise<IManagementDepartment> => {
  const result = await await ManagementDepartment.create(payload);
  return result;
};

// GET All Management Departments Function
const getAllManagementDepartments = async (
  filters: IManagementDepartmentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IManagementDepartment[]>> => {
  // Getting all management departments
  const { page, limit, total, result } = await getAllDocuments(
    filters,
    paginationOptions,
    ManagementDepartmentConstants.searchableFields,
    ManagementDepartment
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

// GET Single Management Department Function
const getSingleManagementDepartment = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findById(id);
  return result;
};

// Update Single Management Department Function
const updateSingleManagementDepartment = async (
  id: string,
  payload: Partial<IManagementDepartment>
): Promise<IManagementDepartment | null> => {
  // Updating management department
  const result = await ManagementDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );
  return result;
};

const deleteManagementDepartment = async (
  id: string
): Promise<IManagementDepartment | null> => {
  return await ManagementDepartment.findByIdAndDelete(id);
};

export const ManagementDepartmentService = {
  createManagementDepartment,
  getAllManagementDepartments,
  getSingleManagementDepartment,
  updateSingleManagementDepartment,
  deleteManagementDepartment,
};
