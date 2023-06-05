//Imports
import { IGenericErrorMessage } from './error';

// Error response format
export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};
