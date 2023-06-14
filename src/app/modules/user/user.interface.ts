//Imports
import { Model } from 'mongoose';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { Types } from 'mongoose';
import { IStudent } from '../student/student.interface';
import { IFaculty } from '../faculty/faculty.interface';

// User Role
export type IUserRole = 'student' | 'faculty' | 'admin';

// User Interface
export type IUser = {
  id: string;
  role: IUserRole;
  password: string;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  // admin?: Types.ObjectId | IAdmin;
};

// User Model Type
export type UserModel = Model<IUser, object>;

// Possible values based on roles
export type IRolePossibleValues = {
  student: IAcademicSemester | null;
  faculty: null;
  admin: null;
};
