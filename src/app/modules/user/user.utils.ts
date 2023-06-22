// Imports
import { ENUM_USER_ROLES } from '../../../enums/users';
import { ConditionalOptions } from '../../../interfaces/common';
import { IRolePossibleValues } from './user.interface';
import { User } from './user.model';
import { UserConstants } from './user.constant';

// Function to find last id
const findLastUserId = async (payload: string): Promise<string | undefined> => {
  // Finding One User and taking id only using filed filtering
  const lastUser = await User.findOne({ role: payload }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastUser?.id;
};

// Function to generate user id
export const generateUserId = async <T extends keyof IRolePossibleValues>(
  userRole: T,
  ...academicSemester: ConditionalOptions<IRolePossibleValues, T>
): Promise<string> => {
  // User Id
  let userId = '';

  // First user id for the requested role in database
  const defaultId = (0).toString().padStart(5, '0');

  // Getting last user id and keeping it in lastUserId variable otherwise storing default id
  const lastUserId = (await findLastUserId(userRole)) || defaultId;

  // Getting last 5 digits of last user id
  const lastFiveDigitsOfLastUserId = lastUserId.substr(lastUserId.length - 5);

  // Increment lastFiveDigitsOfLastUserId by 1 to get the current ID
  const currentId = parseInt(lastFiveDigitsOfLastUserId) + 1;

  // First char of the ID based on roles
  const userIdFirstChar = UserConstants.userRoleShortCodes[userRole];

  // Add formats to the main part of ID based on roles
  if (userRole === ENUM_USER_ROLES.STUDENT && academicSemester[0]) {
    // Student Last two digits of academic semester year
    const studentLastTwoDigitsOfAcademicSemesterYear =
      academicSemester[0].year.substring(2);

    // Student academic semester year code
    const studentAcademicSemesterCode = academicSemester[0].code;

    // Student Format and add current id to add starting '0's
    userId =
      userIdFirstChar +
      studentLastTwoDigitsOfAcademicSemesterYear +
      studentAcademicSemesterCode +
      currentId.toString().padStart(5, '0');
  } else {
    userId = userIdFirstChar + currentId.toString().padStart(5, '0');
  }

  return userId;
};
