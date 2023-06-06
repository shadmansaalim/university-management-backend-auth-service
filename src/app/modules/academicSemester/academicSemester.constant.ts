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

// Mapping title and code to create a relation
const TitleCodeMapper: { [key: string]: string } = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const AcademicSemesterConstants = {
  Titles,
  Codes,
  Months,
  TitleCodeMapper,
};
