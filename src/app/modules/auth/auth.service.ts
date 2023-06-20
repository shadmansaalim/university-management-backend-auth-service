// Imports
import { ILoginUser } from './auth.interface';
import { User } from '../user/user.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

// LOGIN user function
const loginUser = async (payload: ILoginUser) => {
  // Destructuring id and password
  const { id, password } = payload;

  // Checking whether user exists or not
  const userExists = await User.exists(id);

  // Throwing error if user does not exists
  if (!userExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists.');
  }

  // Comparing Password
  const isPasswordMatched = User.isPasswordMatched(
    password,
    userExists.password
  );

  // Throwing error if password does not matches
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect Password.');
  }

  // Create access token

  // Will change later
  return null;
};

export const AuthService = {
  loginUser,
};
