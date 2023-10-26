//Imports
import { Model } from 'mongoose';

// Management Department type
export type IManagementDepartment = {
  title: string;
};

// Management Department Model type
export type ManagementDepartmentModel = Model<
  IManagementDepartment,
  Record<string, unknown>
>;

// Management Department Filters type
export type IManagementDepartmentFilters = {
  searchTerm?: string;
};
