// Imports
import { Schema, model } from 'mongoose';
import {
  IAcademicFaculty,
  AcademicFacultyModel,
} from './academicFaculty.interface';

// Academic Faculty Schema
const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Academic Faculty Model
export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
  'AcademicFaculty',
  academicFacultySchema
);
