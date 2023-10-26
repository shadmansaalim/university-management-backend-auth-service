// Imports
import { Model, Types } from 'mongoose';
import { UserName } from '../../../interfaces/common';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';

// Faculty Interface
export type IFaculty = {
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
  academicDepartment: Types.ObjectId | IAcademicDepartment; // reference _id
  academicFaculty: Types.ObjectId | IAcademicFaculty; // reference _id
  profileImage?: string;
};

// Faculty Model Type
export type FacultyModel = Model<IFaculty, Record<string, unknown>>;

// Faculty Filters Type
export type IFacultyFilters = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};
