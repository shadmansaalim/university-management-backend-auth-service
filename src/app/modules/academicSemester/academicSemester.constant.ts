//Imports
import {
  IAcademicSemesterTitles,
  IAcademicSemesterCodes,
  IAcademicSemesterMonths,
} from './academicSemester.interface';

/* Constants for Academic Semester Module */

// Titles
const titles: IAcademicSemesterTitles[] = ['Autumn', 'Summer', 'Fall'];

// Codes
const codes: IAcademicSemesterCodes[] = ['01', '02', '03'];

// Months
const months: IAcademicSemesterMonths[] = [
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
const titleCodeMapper: { [key: string]: string } = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

// Searching and Filtering  Fields
const filterableFields = ['searchTerm', 'title', 'year', 'code', 'syncId'];

// Searchable fields to GET academic semesters
const searchableFields = ['title', 'year', 'code'];

// Event name of publishing academic semester created data in redis
const event_academic_semester_created = 'academic-semester.created';

// Event name of publishing academic semester updated data in redis
const event_academic_semester_updated = 'academic-semester.updated';

// Event name of publishing academic semester deleted data in redis
const event_academic_semester_deleted = 'academic-semester.deleted';

export const AcademicSemesterConstants = {
  titles,
  codes,
  months,
  titleCodeMapper,
  filterableFields,
  searchableFields,
  event_academic_semester_created,
  event_academic_semester_updated,
  event_academic_semester_deleted,
};
