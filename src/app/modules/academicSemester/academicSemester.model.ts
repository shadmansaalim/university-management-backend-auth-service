// Imports
import { Schema, model } from 'mongoose';
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
      enum: AcademicSemesterConstants.Titles,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterConstants.Codes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterConstants.Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterConstants.Months,
    },
  },
  {
    timestamps: true,
  }
);

// Academic Semester Model
export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
