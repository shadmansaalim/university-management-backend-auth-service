// Imports
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  IAcademicFaculty,
  IAcademicFacultyEvent,
  IAcademicFacultyFilters,
} from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';
import { AcademicFacultyConstants } from './academicFaculty.constant';
import getAllDocuments from '../../../shared/getAllDocuments';

// Create Faculty Function
const createFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

// GET All Faculties Function
const getAllFaculties = async (
  filters: IAcademicFacultyFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  // Getting all faculties
  const { page, limit, total, result } = await getAllDocuments(
    filters,
    paginationOptions,
    AcademicFacultyConstants.searchableFields,
    AcademicFaculty
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
const getSingleFaculty = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

// Update Single Faculty Function
const updateSingleFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  // Updating semester
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

// DELETE Single Faculty
const deleteSingleFaculty = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  // Deleting faculty
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};

const createFacultyFromEvent = async (
  event: IAcademicFacultyEvent
): Promise<void> => {
  const { id, title } = event;

  await AcademicFaculty.create({
    syncId: id,
    title,
  });
};

const updateFacultyFromEvent = async (
  event: IAcademicFacultyEvent
): Promise<void> => {
  const { id, title } = event;

  await AcademicFaculty.findOneAndUpdate(
    { syncId: id },
    {
      $set: {
        title,
      },
    }
  );
};

const deleteFacultyFromEvent = async (syncId: string): Promise<void> => {
  await AcademicFaculty.findOneAndDelete({ syncId });
};

export const AcademicFacultyService = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateSingleFaculty,
  deleteSingleFaculty,
  createFacultyFromEvent,
  updateFacultyFromEvent,
  deleteFacultyFromEvent,
};
