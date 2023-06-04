// Imports
import { NextFunction, Request, Response } from 'express'
import userService from './user.service'

// Function that works when create user POST API hits
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Destructuring user from request body
    const { user } = req.body
    const result = await userService.createUser(user)

    res.status(200).json({
      success: true,
      message: 'User created successfully.',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export default {
  createUser,
}
