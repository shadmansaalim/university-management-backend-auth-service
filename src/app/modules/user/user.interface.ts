//Imports
import { Model } from 'mongoose';

// User Interface
export type IUser = {
  id: string;
  role: string;
  password: string;
};

// User Model Type
export type UserModel = Model<IUser, object>;
