//Imports
import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';

// Academic Department type
export type IAcademicDepartment = {
  title: string;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
};

// Academic Department Model type
export type AcademicDepartmentModel = Model<
  IAcademicDepartment,
  Record<string, unknown>
>;

// Academic Department Filters type
export type IAcademicDepartmentFilters = {
  searchTerm?: string;
  academicFaculty?: Types.ObjectId;
};

export type IAcademicDepartmentEvent = {
  id: string;
  title: string;
  academicFacultyId: string;
};
