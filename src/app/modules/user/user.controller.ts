// Imports
import { RequestHandler } from 'express'
import { UserService } from './user.service'
import { z } from 'zod'

// Function that works when create user POST API hits
const createUser: RequestHandler = async (req, res, next) => {
  try {
    // Validation of sent request using ZOD
    const createUserZodSchema = z.object({
      body: z.object({
        role: z.string({
          required_error: 'role is required',
        }),
        password: z.string().optional(),
      }),
    })

    await createUserZodSchema.parseAsync(req)

    // Destructuring user from request body
    const { user } = req.body
    const result = await UserService.createUser(user)

    res.status(200).json({
      success: true,
      message: 'User created successfully.',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const UserController = {
  createUser,
}
