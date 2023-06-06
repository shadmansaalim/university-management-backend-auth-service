// Imports
import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { IModuleRoute } from './route.interface';

// Express router
const router = express.Router();

// App Module Routes
const moduleRoutes: IModuleRoute[] = [
  { path: '/users', route: UserRoutes },
  { path: '/academic-semesters', route: AcademicSemesterRoutes },
];

// Application Routes
moduleRoutes.forEach((moduleRoute: IModuleRoute) => {
  router.use(moduleRoute?.path, moduleRoute?.route);
});

export default router;
