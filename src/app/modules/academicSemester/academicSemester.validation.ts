// Imports
import { z } from 'zod';
import { AcademicSemesterConstants } from './academicSemester.constant';
import {
  IAcademicSemesterTitles,
  IAcademicSemesterCodes,
  IAcademicSemesterMonths,
} from './academicSemester.interface';

// Validation of API request using ZOD
const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum(
      [...AcademicSemesterConstants.Titles] as [
        IAcademicSemesterTitles,
        ...IAcademicSemesterTitles[]
      ],
      {
        required_error: 'Title is required',
      }
    ),
    year: z.number({
      required_error: 'Year is required',
    }),
    code: z.enum(
      [...AcademicSemesterConstants.Codes] as [
        IAcademicSemesterCodes,
        ...IAcademicSemesterCodes[]
      ],
      {
        required_error: 'Code is required',
      }
    ),
    startMonth: z.enum(
      [...AcademicSemesterConstants.Months] as [
        IAcademicSemesterMonths,
        ...IAcademicSemesterMonths[]
      ],
      {
        required_error: 'Start Month is required',
      }
    ),
    endMonth: z.enum(
      [...AcademicSemesterConstants.Months] as [
        IAcademicSemesterMonths,
        ...IAcademicSemesterMonths[]
      ],
      {
        required_error: 'End Month is required',
      }
    ),
  }),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
};
