// Imports
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { PaginationConstants } from '../../../constants/pagination';
import { AdminConstants } from './admin.constant';
import { AdminService } from './admin.service';
import { IAdmin } from './admin.interface';

// Function to GET All Admins
const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  // Making a filter options object
  const filters = pick(req.query, AdminConstants.filterableFields);

  // Making a pagination options object
  const paginationOptions = pick(req.query, PaginationConstants.fields);

  // Getting all admins based on request
  const result = await AdminService.getAllAdmins(filters, paginationOptions);

  // Sending API Response
  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins retrieved successfully.',
    meta: result?.meta,
    data: result?.data,
  });
});

// Function to GET Single Admin
const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  // Getting admin id from params
  const id = req.params.id;
  const result = await AdminService.getSingleAdmin(id);

  // Sending API Response
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Admin retrieved successfully.',
    data: result,
  });
});

// Function to update admin
const updateSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  // Getting admin id from params
  const id = req.params.id;
  // Getting updated data
  const updatedData = req.body;

  const result = await AdminService.updateSingleAdmin(id, updatedData);

  // Sending API Response
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin updated successfully.',
    data: result,
  });
});

// Function to delete admin
const deleteSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  // Getting admin id from params
  const id = req.params.id;

  const result = await AdminService.deleteSingleAdmin(id);

  // Sending API Response
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin deleted successfully.',
    data: result,
  });
});

export const AdminController = {
  getAllAdmins,
  getSingleAdmin,
  updateSingleAdmin,
  deleteSingleAdmin,
};
