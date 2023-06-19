// Searchable fields to GET admins
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

// Fields to populate in admin data
const fieldsToPopulate = ['managementDepartment'];

export const AdminConstants = {
  searchableFields,
  filterableFields,
  fieldsToPopulate,
};
