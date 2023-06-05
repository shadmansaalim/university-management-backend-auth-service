//Imports
import { Model } from 'mongoose';

// Academic Semester Interface
export type IAcademicSemester = {
  title: string;
  year: number;
  code: string;
  startMonth: string;
  endMonth: string;
};

// Academic Semester Model Type
export type AcademicSemesterModel = Model<IAcademicSemester>;
