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

// Function to create a student in database
const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // New user data
  let newUserData = null;

  // Set user role
  user.role = 'student';

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

  return newUserData;
};

// Exporting all functions of user related from service file
export const UserService = {
  createStudent,
};
