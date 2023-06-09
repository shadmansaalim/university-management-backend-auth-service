/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */

//Imports
import { ErrorRequestHandler } from 'express';
import config from '../../config';
import { errorHandlerHelper } from '../../helpers/errorHandlerHelper';
import { errorLogger } from '../../shared/logger';

// Global Error Handler Function to create a specified format for different type of errors
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // Consoling on development or else logging the errors
  config.env === 'development'
    ? console.log('Global Error Handler : ', error)
    : errorLogger.error('globalErrorHandler ~ ', error);

  // Destructuring
  const { statusCode, errorLists } = errorHandlerHelper;
  let { message, errorMessages } = errorHandlerHelper;

  // Checked whether error type is in our Error Handler Object otherwise handled as generic error
  if (Object.hasOwnProperty.call(errorLists, error.constructor.name)) {
    // Calling the function from the object to handle the error after evaluating type
    errorLists[error.constructor.name](error);
  } else {
    message = error?.message;
    errorMessages = error?.message ? [{ path: '', message: message }] : [];
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    errorMessages: errorMessages,
    stack: config.env !== 'production' ? error?.stack : null,
  });

  next();
};

export default globalErrorHandler;
