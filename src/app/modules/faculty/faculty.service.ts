// Imports
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import getAllDocuments from '../../../shared/getAllDocuments';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import { FacultyConstants } from './faculty.constant';
import { Faculty } from './faculty.model';
import mongoose from 'mongoose';
import { User } from '../user/user.model';
import { RedisClient } from '../../../shared/redis';

// GET All Faculties Function
const getAllFaculties = async (
  filters: IFacultyFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFaculty[]>> => {
  // Getting all faculties
  const { page, limit, total, result } = await getAllDocuments(
    filters,
    paginationOptions,
    FacultyConstants.searchableFields,
    Faculty,
    FacultyConstants.fieldsToPopulate
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

// GET Single Faculty Function
const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findOne({ id })
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

// Update Single Faculty Function
const updateSingleFaculty = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  // Checking whether faculty exists
  const facultyExists = await Faculty.findOne({ id });

  // Throwing error if faculty not exists
  if (!facultyExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found');
  }

  // Destructuring
  const { name, ...facultyData } = payload;

  // Storing faculty data
  const updatedFacultyData: Partial<IFaculty> = { ...facultyData };

  // Dynamically handling update of name

  if (name && Object.keys(name).length) {
    Object.keys(name).forEach((key: string) => {
      const nameKey = `name.${key}`;
      (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  // Updating faculty
  const result = await Faculty.findOneAndUpdate({ id }, updatedFacultyData, {
    new: true,
  })
    .populate('academicDepartment')
    .populate('academicFaculty');

  // Publishing data to redis
  if (result) {
    await RedisClient.publish(
      FacultyConstants.event_faculty_updated,
      JSON.stringify(result)
    );
  }

  return result;
};

// Delete Single Faculty Function
const deleteSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  // Checking whether faculty exists
  const facultyExists = await Faculty.findOne({ id });

  // Throwing error if faculty not exists
  if (!facultyExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found');
  }

  // Mongoose session started
  const session = await mongoose.startSession();

  try {
    // Starting Transaction
    session.startTransaction();

    // Deleting from Faculty Collection
    const faculty = await Faculty.findOneAndDelete({ id }, { session })
      .populate('academicDepartment')
      .populate('academicFaculty');

    // Throwing error if failed to delete faculty
    if (!faculty) {
      throw new ApiError(404, 'Failed to delete from faculty collection');
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

    return faculty;
  } catch (error) {
    // Aborting Transaction because of error
    await session.abortTransaction();
    // Ending Session because of error
    await session.endSession();

    // Throwing error
    throw error;
  }
};

export const FacultyService = {
  getAllFaculties,
  getSingleFaculty,
  updateSingleFaculty,
  deleteSingleFaculty,
};
