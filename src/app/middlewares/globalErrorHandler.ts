//Imports
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import config from '../../config'
import { IGenericErrorMessage } from '../../interfaces/error'
import mongoose from 'mongoose'
import handleValidationError from '../../errors/handleValidationError'
import ApiError from '../../errors/ApiError'

// Global Error Handler Function to create a specified format for different type of errors
const globalErrorHandler: ErrorRequestHandler = (
  err: Error | mongoose.Error.ValidationError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Initializing defaults
  let statusCode = 500
  let message = 'Something went wrong!'
  let errorMessages: Array<IGenericErrorMessage> = []

  // Handle validation error
  if (err instanceof mongoose.Error.ValidationError) {
    const formattedError = handleValidationError(err)
    // Destructuring
    ;({ statusCode, message, errorMessages } = formattedError)
  }
  // Handle errors that are instances of our custom ApiError class
  else if (err instanceof ApiError) {
    statusCode = err?.statusCode
    message = err?.message
    errorMessages = err?.message ? [{ path: '', message: message }] : []
  }
  // Handle regular errors that are instances of Error
  else if (err instanceof Error) {
    message = err?.message
    errorMessages = err?.message ? [{ path: '', message: message }] : []
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    errorMessages: errorMessages,
    stack: config.env !== 'production' ? err?.stack : null,
  })

  next()
}

export default globalErrorHandler
