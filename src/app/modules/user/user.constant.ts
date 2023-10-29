// User Role Short Codes
const userRoleShortCodes = {
  super_admin: 'SA',
  admin: 'A',
  student: 'S',
  faculty: 'F',
};

// Event name of publishing student created data in redis
const event_student_created = 'student.created';

// Event name of publishing faculty created data in redis
const event_faculty_created = 'faculty.created';

export const UserConstants = {
  userRoleShortCodes,
  event_student_created,
  event_faculty_created,
};
