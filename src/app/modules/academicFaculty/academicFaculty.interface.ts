//Imports
import { Model } from 'mongoose';

// Academic Faculty Interface
export type IAcademicFaculty = {
  title: string;
  syncId: string;
};

// Academic Faculty Model Type
export type AcademicFacultyModel = Model<IAcademicFaculty>;

// Academic Faculty Filters Type
export type IAcademicFacultyFilters = {
  searchTerm?: string;
};

export type IAcademicFacultyEvent = {
  id: string;
  title: string;
};
