//Imports
import { NextFunction, Request, Response } from 'express'
import config from '../../config'
import { IGenericErrorMessage } from '../../interfaces/error'
import mongoose from 'mongoose'

// Global Error Handler Function to create a specified format for different type of errors
const globalErrorHandler = (
  err: mongoose.Error.ValidationError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Initializing defaults
  const statusCode = 500
  const message = 'Something went wrong!'
  const errorMessages: Array<IGenericErrorMessage> = []

  if (err?.name === 'ValidationError') {
    // Handle validation error
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
