// Genders
const gender = ['male', 'female'];

// Blood Group
const bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

// Searchable fields to GET students
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

// Fields to populate in student data
const fieldsToPopulate = [
  'academicSemester',
  'academicDepartment',
  'academicFaculty',
];

export const StudentConstants = {
  gender,
  bloodGroup,
  searchableFields,
  filterableFields,
  fieldsToPopulate,
};
