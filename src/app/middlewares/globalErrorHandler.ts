/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */

//Imports
import { ErrorRequestHandler } from 'express'
import config from '../../config'
import { IGenericErrorMessage } from '../../interfaces/error'
import mongoose from 'mongoose'
import handleValidationError from '../../errors/handleValidationError'
import ApiError from '../../errors/ApiError'
import { errorLogger } from '../../shared/logger'
import { ZodError } from 'zod'
import handleZodError from '../../errors/handleZodError'

// Global Error Handler Function to create a specified format for different type of errors
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // Consoling on development or else logging the errors
  config.env === 'development'
    ? console.log('globalErrorHandler ~ ', error)
    : errorLogger.error('globalErrorHandler ~ ', error)

  // Initializing defaults
  let statusCode = 500
  let message = 'Something went wrong!'
  let errorMessages: Array<IGenericErrorMessage> = []

  // Handle Mongoose validation error
  if (error instanceof mongoose.Error.ValidationError) {
    const formattedError = handleValidationError(error)
    // Destructuring
    ;({ statusCode, message, errorMessages } = formattedError)
  }
  // Handle ZOD Error
  else if (error instanceof ZodError) {
    const formattedError = handleZodError(error)
    // Destructuring
    ;({ statusCode, message, errorMessages } = formattedError)
  }
  // Handle errors that are instances of our custom ApiError class
  else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error?.message
    errorMessages = error?.message ? [{ path: '', message: message }] : []
  }
  // Handle regular errors that are instances of Error
  else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message ? [{ path: '', message: message }] : []
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    errorMessages: errorMessages,
    stack: config.env !== 'production' ? error?.stack : null,
  })

  next()
}

export default globalErrorHandler
