// Imports
import express from 'express'
import { UserController } from './user.controller'

// Express router
const router = express.Router()

// API Endpoints
router.post('/create-user', UserController.createUser)

export const UserRoutes = router
