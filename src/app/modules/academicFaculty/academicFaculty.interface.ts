//Imports
import { Model } from 'mongoose';

// Academic Faculty Interface
export type IAcademicFaculty = {
  title: string;
};

// Academic Faculty Model Type
export type AcademicFacultyModel = Model<IAcademicFaculty>;
