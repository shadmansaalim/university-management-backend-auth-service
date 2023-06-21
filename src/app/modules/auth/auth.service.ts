// Imports
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import { User } from '../user/user.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import config from '../../../config';
import { JwtHelpers } from '../../../helpers/jwtHelper';
import { Secret } from 'jsonwebtoken';

// LOGIN user function
const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  // Destructuring id and password
  const { id: loginId, password: loginPassword } = payload;

  // Checking whether user exists or not
  const userExists = await User.exists(loginId);

  // Throwing error if user does not exists
  if (!userExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists.');
  }

  // Destructuring
  const { id, role, password, needsPasswordChange } = userExists;

  // Comparing Password
  const isPasswordMatched = User.isPasswordMatched(loginPassword, password);

  // Throwing error if password does not matches
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect Password.');
  }

  // Create access token
  const accessToken = JwtHelpers.createToken(
    { id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  // Create refresh token
  const refreshToken = JwtHelpers.createToken(
    { id, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

// Refresh token function
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;

  // Verify given token
  try {
    verifiedToken = JwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token.');
  }

  // Destructuring
  const { id, role } = verifiedToken;

  // Checking whether user exists or not as sometimes deleted user might try to access using refresh token.
  const userExists = await User.exists(id);

  // Throwing error if user does not exists
  if (!userExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists.');
  }

  // Generate new access token
  const newAccessToken = JwtHelpers.createToken(
    { id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
