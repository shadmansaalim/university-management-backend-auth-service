// Imports
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { PaginationConstants } from '../../../constants/pagination';
import { IManagementDepartment } from './managementDepartment.interface';
import { ManagementDepartmentConstants } from './managementDepartment.constant';
import { ManagementDepartmentService } from './managementDepartment.service';

// Function that works when create management department POST API hits
const createManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    // Destructuring Management Department data from request body
    const { ...managementDepartmentData } = req.body;
    const result = await ManagementDepartmentService.createManagementDepartment(
      managementDepartmentData
    );

    // Sending API Response
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department created successfully',
      data: result,
    });
  }
);

// Function to GET All Management Departments
const getAllManagementDepartments = catchAsync(
  async (req: Request, res: Response) => {
    // Making a filter options object
    const filters = pick(
      req.query,
      ManagementDepartmentConstants.filterableFields
    );

    // Making a pagination options object
    const paginationOptions = pick(req.query, PaginationConstants.fields);

    // Getting all management departments based on request
    const result =
      await ManagementDepartmentService.getAllManagementDepartments(
        filters,
        paginationOptions
      );

    sendResponse<IManagementDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Departments retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

// Function to GET Single Management Department
const getSingleManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    // Destructuring id from params
    const { id } = req.params;
    const result =
      await ManagementDepartmentService.getSingleManagementDepartment(id);

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department retrieved successfully',
      data: result,
    });
  }
);

// Function to update management department
const updateSingleManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    // Getting management department id from params
    const id = req.params.id;
    // Getting updated data
    const updatedData = req.body;

    const result =
      await ManagementDepartmentService.updateSingleManagementDepartment(
        id,
        updatedData
      );

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department updated successfully',
      data: result,
    });
  }
);

const deleteManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ManagementDepartmentService.deleteManagementDepartment(
      id
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department deleted successfully',
      data: result,
    });
  }
);

export const ManagementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartments,
  getSingleManagementDepartment,
  updateSingleManagementDepartment,
  deleteManagementDepartment,
};
