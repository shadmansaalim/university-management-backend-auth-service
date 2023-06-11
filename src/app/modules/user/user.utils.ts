// Imports
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

// Function to find last student id
export const findLastStudentId = async () => {
  // Finding One User and taking id only using filed filtering
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastUser?.id;
};

// Function to generate student id
export const generateStudentId = async (
  academicSemester: IAcademicSemester
): Promise<string> => {
  // Student Last two digits of academic semester year
  const studentLastTwoDigitsOfAcademicSemesterYear =
    academicSemester.year.substring(2);

  // Student academic semester year code
  const studentAcademicSemesterCode = academicSemester.code;

  // Getting last student id and keeping it in defaultId variable if not storing default id which is for the first user in the database
  const defaultId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');

  // Increment defaultId by 1
  const currentId = parseInt(defaultId) + 1;

  // Format current id to add starting '0's
  const formattedCurrentId =
    studentLastTwoDigitsOfAcademicSemesterYear +
    studentAcademicSemesterCode +
    currentId.toString().padStart(5, '0');

  return formattedCurrentId;
};
