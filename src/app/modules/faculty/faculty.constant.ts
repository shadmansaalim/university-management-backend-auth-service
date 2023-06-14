// Searchable fields to GET faculties
const searchableFields = [
  'id',
  'email',
  'contactNo',
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

// Fields to populate in faculty data
const fieldsToPopulate = ['academicDepartment', 'academicFaculty'];

export const FacultyConstants = {
  searchableFields,
  filterableFields,
  fieldsToPopulate,
};
