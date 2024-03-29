// Imports
import { z } from 'zod';
import { AcademicSemesterConstants } from './academicSemester.constant';
import {
  IAcademicSemesterTitles,
  IAcademicSemesterCodes,
  IAcademicSemesterMonths,
} from './academicSemester.interface';

// Validation of POST API request using ZOD
const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum(
      [...AcademicSemesterConstants.titles] as [
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
      [...AcademicSemesterConstants.codes] as [
        IAcademicSemesterCodes,
        ...IAcademicSemesterCodes[]
      ],
      {
        required_error: 'Code is required',
      }
    ),
    startMonth: z.enum(
      [...AcademicSemesterConstants.months] as [
        IAcademicSemesterMonths,
        ...IAcademicSemesterMonths[]
      ],
      {
        required_error: 'Start Month is required',
      }
    ),
    endMonth: z.enum(
      [...AcademicSemesterConstants.months] as [
        IAcademicSemesterMonths,
        ...IAcademicSemesterMonths[]
      ],
      {
        required_error: 'End Month is required',
      }
    ),
  }),
});

// Validation of PATCH API request using ZOD
const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...AcademicSemesterConstants.titles] as [
          IAcademicSemesterTitles,
          ...IAcademicSemesterTitles[]
        ])
        .optional(),
      year: z.number().optional(),
      code: z
        .enum([...AcademicSemesterConstants.codes] as [
          IAcademicSemesterCodes,
          ...IAcademicSemesterCodes[]
        ])
        .optional(),
      startMonth: z
        .enum([...AcademicSemesterConstants.months] as [
          IAcademicSemesterMonths,
          ...IAcademicSemesterMonths[]
        ])
        .optional(),
      endMonth: z
        .enum([...AcademicSemesterConstants.months] as [
          IAcademicSemesterMonths,
          ...IAcademicSemesterMonths[]
        ])
        .optional(),
    }),
  })
  .refine(
    data =>
      // You need to update title and code together but not only one
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message:
        'You can update title and code together, but not only one, as our academic semester title and code have a consistency relationship that needs to be followed.',
    }
  );

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
};
