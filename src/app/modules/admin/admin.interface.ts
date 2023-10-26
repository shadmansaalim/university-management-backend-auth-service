// Imports
import { Model, Types } from 'mongoose';
import { UserName } from '../../../interfaces/common';
import { IManagementDepartment } from '../managementDepartment/managementDepartment.interface';

// Admin Interface
export type IAdmin = {
  id: string;
  name: UserName; //embedded object
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  designation: string;
  managementDepartment: Types.ObjectId | IManagementDepartment; // reference _id
  profileImage?: string;
};

// Admin Model Type
export type AdminModel = Model<IAdmin, Record<string, unknown>>;

// Admin Filters Type
export type IAdminFilters = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};
