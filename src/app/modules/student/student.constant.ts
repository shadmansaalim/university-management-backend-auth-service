// Searchable fields to GET students
const searchableFields = [
  'email',
  'contactNo',
  'emergencyContactNo',
  'name.firstName',
  'name.middleName',
  'name.lastName',
];

// Searching and Filtering  Fields
const filterableFields = [
  'searchTerm',
  'id',
  'bloodGroup',
  'email',
  'contactNo',
  'emergencyContactNo',
];

// Fields to populate in student data
const fieldsToPopulate = [
  'academicSemester',
  'academicDepartment',
  'academicFaculty',
];

// Event name of publishing student updated data in redis
const event_student_updated = 'student.updated';

export const StudentConstants = {
  searchableFields,
  filterableFields,
  fieldsToPopulate,
  event_student_updated,
};
