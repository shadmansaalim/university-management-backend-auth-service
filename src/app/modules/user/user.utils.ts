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
export const generateUserId = async (
  role: ENUM_USER_ROLES
): Promise<string> => {
  // First user id for the requested role in database
  const defaultId = (0).toString().padStart(5, '0');

  // Getting last user id and keeping it in lastUserId variable otherwise storing default id
  const lastUserId = (await findLastUserId(role)) || defaultId;

  // Getting last 5 digits of last user id
  const lastFiveDigitsOfLastUserId = lastUserId.substr(lastUserId.length - 5);

  // Increment lastFiveDigitsOfLastUserId by 1 to get the current ID
  const currentId = parseInt(lastFiveDigitsOfLastUserId) + 1;

  // First char of the ID based on roles
  const userIdFirstChar = UserConstants.userRoleShortCodes[role];

  const userId = userIdFirstChar + currentId.toString().padStart(5, '0');

  return userId;
};
