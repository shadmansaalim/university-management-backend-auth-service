// Imports
import {
  IAcademicSemester,
  IAcademicSemesterCreatedEvent,
  IAcademicSemesterFilters,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import { AcademicSemesterConstants } from './academicSemester.constant';
import ApiError from '../../../errors/ApiError';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import httpStatus from 'http-status';
import getAllDocuments from '../../../shared/getAllDocuments';

// Create Semester Function
const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  // Checking whether the format of payload is following the relation consistency of Title and Code
  if (
    payload?.code !== AcademicSemesterConstants.titleCodeMapper[payload?.title]
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Invalid Semester Code Provided'
    );
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

// GET All Semesters Function
const getAllSemesters = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  // Getting all semesters
  const { page, limit, total, result } = await getAllDocuments(
    filters,
    paginationOptions,
    AcademicSemesterConstants.searchableFields,
    AcademicSemester
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

// GET Single Semester Function
const getSingleSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};

// Update Single Semester Function
const updateSingleSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  // Checking whether the format of payload is following the relation consistency of Title and Code
  if (
    payload?.title &&
    payload?.code &&
    payload?.code !== AcademicSemesterConstants.titleCodeMapper[payload?.title]
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Invalid Semester Code Provided'
    );
  }

  // Updating semester
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

// DELETE Single Semester
const deleteSingleSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  // Deleting semester
  const result = await AcademicSemester.findByIdAndDelete(id);
  return result;
};

const createSemesterFromEvent = async (
  event: IAcademicSemesterCreatedEvent
): Promise<void> => {
  const { id, title, year, code, startMonth, endMonth } = event;
  await AcademicSemester.create({
    title,
    year,
    code,
    startMonth,
    endMonth,
    syncId: id,
  });
};

const updateSemesterFromEvent = async (
  event: IAcademicSemesterCreatedEvent
): Promise<void> => {
  const { id, title, year, code, startMonth, endMonth } = event;
  await AcademicSemester.findOneAndUpdate(
    { syncId: id },
    {
      $set: {
        title,
        year,
        code,
        startMonth,
        endMonth,
        syncId: id,
      },
    }
  );
};

const deleteSemesterFromEvent = async (syncId: string): Promise<void> => {
  await AcademicSemester.findOneAndDelete({ syncId });
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSingleSemester,
  deleteSingleSemester,
  createSemesterFromEvent,
  updateSemesterFromEvent,
  deleteSemesterFromEvent,
};
