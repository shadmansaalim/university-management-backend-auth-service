// Imports
import { PaginationConstants } from '../constants/pagination';

// Options Type
type IOptions = {
  page?: number;
  limit?: number;
};

// Helper function for Feature Pagination
const calculatePagination = (
  options: IOptions
): {
  page: number;
  limit: number;
  skip: number;
} => {
  const page = Number(options?.page || PaginationConstants.DEFAULT_PAGE);
  const limit = Number(options?.limit || PaginationConstants.DEFAULT_LIMIT);

  // Number of data to skip
  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
  };
};

export const PaginationHelpers = { calculatePagination };
