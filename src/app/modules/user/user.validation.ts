// Imports
import { z } from 'zod'

// Validation of API request using ZOD
const createUserZodSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'role is required',
    }),
    password: z.string().optional(),
  }),
})

export const UserValidation = {
  createUserZodSchema,
}
