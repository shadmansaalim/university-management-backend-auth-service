//Imports
import {
  IAcademicSemesterTitles,
  IAcademicSemesterCodes,
  IAcademicSemesterMonths,
} from './academicSemester.interface';

/* Constants for Academic Semester Module */

// Titles
const Titles: IAcademicSemesterTitles[] = ['Autumn', 'Summer', 'Fall'];

// Codes
const Codes: IAcademicSemesterCodes[] = ['01', '02', '03'];

// Months
const Months: IAcademicSemesterMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const AcademicSemesterConstants = {
  Titles,
  Codes,
  Months,
};
