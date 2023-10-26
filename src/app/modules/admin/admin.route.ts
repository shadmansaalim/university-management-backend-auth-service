// Imports
import express from 'express';
import { AdminController } from './admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidation } from './admin.validation';
import authGuard from '../../middlewares/authGuard';
import { ENUM_USER_ROLES } from '../../../enums/users';

// Express router
const router = express.Router();

// API Endpoints
router.get(
  '/:id',
  authGuard(
    ENUM_USER_ROLES.STUDENT,
    ENUM_USER_ROLES.FACULTY,
    ENUM_USER_ROLES.ADMIN,
    ENUM_USER_ROLES.SUPER_ADMIN
  ),
  AdminController.getSingleAdmin
);

router.get(
  '/',
  authGuard(
    ENUM_USER_ROLES.STUDENT,
    ENUM_USER_ROLES.FACULTY,
    ENUM_USER_ROLES.ADMIN,
    ENUM_USER_ROLES.SUPER_ADMIN
  ),
  AdminController.getAllAdmins
);

router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdminZodSchema),
  authGuard(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.SUPER_ADMIN),
  AdminController.updateSingleAdmin
);

router.delete(
  '/:id',
  authGuard(ENUM_USER_ROLES.SUPER_ADMIN),
  AdminController.deleteSingleAdmin
);

export const AdminRoutes = router;
