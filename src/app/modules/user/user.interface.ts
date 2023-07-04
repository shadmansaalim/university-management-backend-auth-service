/* eslint-disable  no-unused-vars */

//Imports
import { Model } from 'mongoose';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { Types } from 'mongoose';
import { IStudent } from '../student/student.interface';
import { IFaculty } from '../faculty/faculty.interface';
import { IAdmin } from '../admin/admin.interface';
import { ENUM_USER_ROLES } from '../../../enums/users';

// User Interface
export type IUser = {
  id: string;
  role: ENUM_USER_ROLES;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
};

// User Model Type
export type UserModel = {
  exists(
    id: string
  ): Promise<Pick<
    IUser,
    'id' | 'role' | 'password' | 'needsPasswordChange'
  > | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

// Possible values based on roles
export type IRolePossibleValues = {
  student: IAcademicSemester | null;
  faculty: null;
  admin: null;
};
