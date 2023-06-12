//Imports
import { Model } from 'mongoose';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';

// User Role
export type IUserRole = 'student' | 'faculty' | 'admin';

// User Interface
export type IUser = {
  id: string;
  role: IUserRole;
  password: string;
};

// User Model Type
export type UserModel = Model<IUser, object>;

// Possible values based on roles
export type IRolePossibleValues = {
  student: IAcademicSemester;
  faculty: null;
  admin: null;
};
