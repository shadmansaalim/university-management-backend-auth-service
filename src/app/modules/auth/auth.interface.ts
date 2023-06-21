// Login User Response type
export type ILoginUser = {
  accessToken: string;
  refreshToken: string;
  needsPasswordChange: boolean;
};
