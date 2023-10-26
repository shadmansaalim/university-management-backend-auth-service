//Imports
import { Model } from 'mongoose';

// Title type
export type IAcademicSemesterTitles = 'Autumn' | 'Summer' | 'Fall';

// Code type
export type IAcademicSemesterCodes = '01' | '02' | '03';

// Month type
export type IAcademicSemesterMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

// Academic Semester Interface
export type IAcademicSemester = {
  title: IAcademicSemesterTitles;
  year: string;
  code: IAcademicSemesterCodes;
  startMonth: IAcademicSemesterMonths;
  endMonth: IAcademicSemesterMonths;
};

// Academic Semester Model Type
export type AcademicSemesterModel = Model<IAcademicSemester>;

// Academic Semester Filters Type
export type IAcademicSemesterFilters = {
  searchTerm?: string;
};
