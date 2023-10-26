// Imports
import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { AcademicSemesterConstants } from './academicSemester.constant';
import {
  IAcademicSemester,
  AcademicSemesterModel,
} from './academicSemester.interface';

// Academic Semester Schema
const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: AcademicSemesterConstants.titles,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterConstants.codes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterConstants.months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterConstants.months,
    },
    syncId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

/* Handling Duplicate (same year & same semester issue) */

// Pre hook
academicSemesterSchema.pre('save', async function (next) {
  // Checking if semester already exists
  const semesterExists = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });

  if (semesterExists) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic Semester already exists!'
    );
  }
  next();
});

// Academic Semester Model
export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
