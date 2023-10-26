// Imports
import initAcademicSemesterEvents from '../modules/academicSemester/academicSemester.event';
import initAcademicFacultyEvents from '../modules/academicFaculty/academicFaculty.event';
import initAcademicDepartmentEvents from '../modules/academicDepartment/academicDepartment.event';

const subscribeToEvents = () => {
  initAcademicSemesterEvents();
  initAcademicFacultyEvents();
  initAcademicDepartmentEvents();
};

export default subscribeToEvents;
