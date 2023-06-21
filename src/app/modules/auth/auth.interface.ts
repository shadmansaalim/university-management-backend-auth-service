// Login User Service function arguments
export type ILoginUser = {
  id: string;
  password: string;
};

// Login User Response type
export type ILoginUserResponse = {
  accessToken: string;
  refreshToken: string;
  needsPasswordChange: boolean;
};

// Refresh toke  Response type
export type IRefreshTokenResponse = {
  accessToken: string;
};
