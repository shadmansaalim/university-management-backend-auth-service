// Imports
import express from 'express'
import userController from './user.controller'

// Express router
const router = express.Router()

// API Endpoints

router.post('/create-user', userController.createUser)

export default router
