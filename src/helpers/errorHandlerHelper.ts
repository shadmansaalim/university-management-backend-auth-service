/* eslint-disable no-unused-vars */
//Imports
import httpStatus from 'http-status';
import handleCastError from '../errors/handleCastError';
import handleValidationError from '../errors/handleValidationError';
import handleZodError from '../errors/handleZodError';
import { IGenericErrorMessage } from '../interfaces/error';

// Initializing defaults
let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
let message = 'Something went wrong!';
let errorMessages: Array<IGenericErrorMessage> = [];

// Handling different type of errors
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const errorLists: Record<string, (error: any) => void> = {
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
  CastError: function (error) {
    const formattedError = handleCastError(error);
    // Destructuring
    ({ statusCode, message, errorMessages } = formattedError);
  },
};

export const errorHandlerHelper = {
  statusCode,
  message,
  errorMessages,
  errorLists,
};
