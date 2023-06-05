// Imports
import { RequestHandler } from 'express';
import { AcademicSemesterService } from './academicSemester.service';

// Function that works when create academic semester POST API hits
const createSemester: RequestHandler = async (req, res, next) => {
  try {
    // Destructuring Academic Semester data from request body
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );

    res.status(200).json({
      success: true,
      message: 'Academic Semester created successfully.',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AcademicSemesterController = {
  createSemester,
};
