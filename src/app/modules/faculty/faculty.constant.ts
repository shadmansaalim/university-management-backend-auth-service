// Searchable fields to GET faculties
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
  'designation',
];

// Fields to populate in faculty data
const fieldsToPopulate = ['academicDepartment', 'academicFaculty'];

// Event name of publishing faculty updated data in redis
const event_faculty_updated = 'faculty.updated';

export const FacultyConstants = {
  searchableFields,
  filterableFields,
  fieldsToPopulate,
  event_faculty_updated,
};
