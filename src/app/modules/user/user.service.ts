//Imports
import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateUserId } from './user.utils';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import mongoose from 'mongoose';
import { Student } from '../student/student.model';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { ENUM_USER_ROLES } from '../../../enums/users';
import { RedisClient } from '../../../shared/redis';
import { UserConstants } from './user.constant';

// Function to create a student in database
const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // New user data
  let newUserData = null;

  // Set user role
  user.role = ENUM_USER_ROLES.STUDENT;

  // Assigning Default Password if not password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }

  // Getting student's academic semester
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );

  // Mongoose session started;
  const session = await mongoose.startSession();

  try {
    // Starting Transaction
    session.startTransaction();

    // Generating student id and storing it;
    const studentId = await generateUserId(user.role, academicSemester);
    student.id = studentId;

    //Creating new student
    const newStudent = await Student.create([student], { session });

    // Throwing error if fails to create student
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, `Failed to create student`);
    }

    // Set user id as studentId and student's _id into student field of user
    user.id = studentId;
    user.student = newStudent[0]._id;

    // Creating new user
    const newUser = await User.create([user], { session });

    // Throwing error if fails to create user
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, `Failed to create an user`);
    }

    // Storing new user data
    newUserData = newUser[0];

    // Committing Transaction
    await session.commitTransaction();

    // Ending Session
    await session.endSession();
  } catch (error) {
    // Aborting Transaction because of error
    await session.abortTransaction();
    // Ending Session because of error
    await session.endSession();

    // Throwing error
    throw error;
  }

  if (newUserData) {
    newUserData = await User.findOne({ id: newUserData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  // Publishing data in redis
  if (newUserData) {
    await RedisClient.publish(
      UserConstants.event_student_created,
      JSON.stringify(newUserData.student)
    );
  }

  return newUserData;
};

// Function to create a faculty in database
const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  // New user data
  let newUserData = null;

  // Set user role
  user.role = ENUM_USER_ROLES.FACULTY;

  // Assigning Default Password if not password
  if (!user.password) {
    user.password = config.default_faculty_pass as string;
  }

  // Mongoose session started;
  const session = await mongoose.startSession();

  try {
    // Starting Transaction
    session.startTransaction();

    // Generating faculty id and storing it;
    const facultyId = await generateUserId(user.role);
    faculty.id = facultyId;

    //Creating new faculty
    const newFaculty = await Faculty.create([faculty], { session });

    // Throwing error if fails to create faculty
    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, `Failed to create faculty`);
    }

    // Set user id as facultyId and faculty's _id into student field of user
    user.id = facultyId;
    user.faculty = newFaculty[0]._id;

    // Creating new user
    const newUser = await User.create([user], { session });

    // Throwing error if fails to create user
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, `Failed to create an user`);
    }

    // Storing new user data
    newUserData = newUser[0];

    // Committing Transaction
    await session.commitTransaction();

    // Ending Session
    await session.endSession();
  } catch (error) {
    // Aborting Transaction because of error
    await session.abortTransaction();
    // Ending Session because of error
    await session.endSession();

    // Throwing error
    throw error;
  }

  if (newUserData) {
    newUserData = await User.findOne({ id: newUserData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }
  return newUserData;
};

// Function to create an admin in database
const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  // New user data
  let newUserData = null;

  // Set user role
  user.role = ENUM_USER_ROLES.ADMIN;

  // Assigning Default Password if not password
  if (!user.password) {
    user.password = config.default_admin_pass as string;
  }

  // Mongoose session started;
  const session = await mongoose.startSession();

  try {
    // Starting Transaction
    session.startTransaction();

    // Generating admin id and storing it;
    const adminId = await generateUserId(user.role);
    admin.id = adminId;

    //Creating new admin
    const newAdmin = await Admin.create([admin], { session });

    // Throwing error if fails to create admin
    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, `Failed to create admin`);
    }

    // Set user id as adminId and admin's _id into student field of user
    user.id = adminId;
    user.admin = newAdmin[0]._id;

    // Creating new user
    const newUser = await User.create([user], { session });

    // Throwing error if fails to create user
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, `Failed to create an user`);
    }

    // Storing new user data
    newUserData = newUser[0];

    // Committing Transaction
    await session.commitTransaction();

    // Ending Session
    await session.endSession();
  } catch (error) {
    // Aborting Transaction because of error
    await session.abortTransaction();
    // Ending Session because of error
    await session.endSession();

    // Throwing error
    throw error;
  }

  if (newUserData) {
    newUserData = await User.findOne({ id: newUserData.id }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    });
  }
  return newUserData;
};

// Exporting all functions of user related from service file
export const UserService = {
  createStudent,
  createFaculty,
  createAdmin,
};
