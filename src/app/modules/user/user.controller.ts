// Imports
import { Request, Response } from 'express'
import userService from './user.service'

// Function that works when create user POST API hits
const createUser = async (req: Request, res: Response) => {
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
    res.status(400).json({
      success: false,
      message: 'Failed to create user.',
    })
  }
}

export default {
  createUser,
}
