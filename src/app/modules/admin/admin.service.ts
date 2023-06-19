// Imports
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import getAllDocuments from '../../../shared/getAllDocuments';
import { IAdmin, IAdminFilters } from './admin.interface';
import { AdminConstants } from './admin.constant';
import { Admin } from './admin.model';

// GET All Admins Function
const getAllAdmins = async (
  filters: IAdminFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAdmin[]>> => {
  // Getting all admins
  const { page, limit, total, result } = await getAllDocuments(
    filters,
    paginationOptions,
    AdminConstants.searchableFields,
    Admin,
    AdminConstants.fieldsToPopulate
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

// GET Single Admin Function
const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findOne({ id }).populate('managementDepartment');
  return result;
};

// Update Single Admin Function
const updateSingleAdmin = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  // Checking whether admin exists
  const adminExists = await Admin.findOne({ id });

  // Throwing error if admin not exists
  if (!adminExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
  }

  // Destructuring
  const { name, ...adminData } = payload;

  // Storing admin data
  const updatedAdminData: Partial<IAdmin> = { ...adminData };

  // Dynamically handling update of name

  if (name && Object.keys(name).length) {
    Object.keys(name).forEach((key: string) => {
      const nameKey = `name.${key}`;
      (updatedAdminData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  // Updating admin
  const result = await Admin.findOneAndUpdate({ id }, updatedAdminData, {
    new: true,
  }).populate('managementDepartment');
  return result;
};

export const AdminService = {
  getAllAdmins,
  getSingleAdmin,
  updateSingleAdmin,
};
