/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */

//Imports
import { ErrorRequestHandler } from 'express';
import config from '../../config';
import { IGenericErrorMessage } from '../../interfaces/error';
import handleValidationError from '../../errors/handleValidationError';
import { errorLogger } from '../../shared/logger';
import handleZodError from '../../errors/handleZodError';

// Initializing defaults
let statusCode = 500;
let message = 'Something went wrong!';
let errorMessages: Array<IGenericErrorMessage> = [];

// Handling different type of errors

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const errorHandlers: Record<string, (error: any) => void> = {
  ValidationError: function (error) {
    const formattedError = handleValidationError(error);
    // Destructuring
    ({ statusCode, message, errorMessages } = formattedError);
  },
  ZodError: function (error) {
    const formattedError = handleZodError(error);
    // Destructuring
    ({ statusCode, message, errorMessages } = formattedError);
  },
  ApiError: function (error) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message ? [{ path: '', message: message }] : [];
  },
  Error: function (error) {
    message = error?.message;
    errorMessages = error?.message ? [{ path: '', message: message }] : [];
  },
};

// Global Error Handler Function to create a specified format for different type of errors
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // Consoling on development or else logging the errors
  config.env === 'development'
    ? console.log('globalErrorHandler ~ ', error)
    : errorLogger.error('globalErrorHandler ~ ', error);

  // Calling the function from the object to handle the error after evaluating type
  errorHandlers[error.constructor.name](error);

  res.status(statusCode).json({
    success: false,
    message: message,
    errorMessages: errorMessages,
    stack: config.env !== 'production' ? error?.stack : null,
  });

  next();
};

export default globalErrorHandler;
