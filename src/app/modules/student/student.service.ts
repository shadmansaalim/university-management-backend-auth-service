// Imports
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { IStudent, IStudentFilters } from './student.interface';
import { StudentConstants } from './student.constant';
import { Student } from './student.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import getAllDocuments from '../../../shared/getAllDocuments';
import mongoose from 'mongoose';
import { User } from '../user/user.model';

// GET All Students Function
const getAllStudents = async (
  filters: IStudentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IStudent[]>> => {
  // Getting all students
  const { page, limit, total, result } = await getAllDocuments(
    filters,
    paginationOptions,
    StudentConstants.searchableFields,
    Student,
    StudentConstants.fieldsToPopulate
  );

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// GET Single Student Function
const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findOne({ id })
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

// Update Single Student Function
const updateSingleStudent = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  // Checking whether student exists
  const studentExists = await Student.findOne({ id });

  // Throwing error if student not exists
  if (!studentExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }

  // Destructuring
  const { name, guardian, localGuardian, ...studentData } = payload;

  // Storing student data
  const updatedStudentData: Partial<IStudent> = { ...studentData };

  // Dynamically handling update of name, guardian and localGuardian

  if (name && Object.keys(name).length) {
    Object.keys(name).forEach((key: string) => {
      const nameKey = `name.${key}`;
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  if (guardian && Object.keys(guardian).length) {
    Object.keys(guardian).forEach((key: string) => {
      const guardianKey = `name.${key}`;
      (updatedStudentData as any)[guardianKey] =
        guardian[key as keyof typeof guardian];
    });
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    Object.keys(localGuardian).forEach((key: string) => {
      const localGuardianKey = `name.${key}`;
      (updatedStudentData as any)[localGuardianKey] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }

  // Updating student
  const result = await Student.findOneAndUpdate({ id }, updatedStudentData, {
    new: true,
  })
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

// Delete Single Student Function
const deleteSingleStudent = async (id: string): Promise<IStudent | null> => {
  // Checking whether student exists
  const studentExists = await Student.findOne({ id });

  // Throwing error if student not exists
  if (!studentExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }

  // Mongoose session started
  const session = await mongoose.startSession();

  try {
    // Starting Transaction
    session.startTransaction();

    // Deleting from Student Collection
    const student = await Student.findOneAndDelete({ id }, { session })
      .populate('academicSemester')
      .populate('academicDepartment')
      .populate('academicFaculty');

    // Throwing error if failed to delete student
    if (!student) {
      throw new ApiError(404, 'Failed to delete from student collection');
    }

    // Deleting from User Collection
    const user = await User.deleteOne({ id }, { session });

    // Throwing error if failed to delete user
    if (!user) {
      throw new ApiError(404, 'Failed to delete from user collection');
    }

    // Committing Transaction
    await session.commitTransaction();

    // Ending Session
    await session.endSession();

    return student;
  } catch (error) {
    // Aborting Transaction because of error
    await session.abortTransaction();
    // Ending Session because of error
    await session.endSession();

    // Throwing error
    throw error;
  }
};

export const StudentService = {
  getAllStudents,
  getSingleStudent,
  updateSingleStudent,
  deleteSingleStudent,
};
