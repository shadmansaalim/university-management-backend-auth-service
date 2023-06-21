// Imports
import { Secret } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

// Function to creat jwt token
const createToken = (
  payload: {
    id: string;
    role: string;
  },
  secret: Secret,
  expiresIn: string
) => {
  return jwt.sign(payload, secret, {
    expiresIn,
  });
};

export const JwtHelpers = { createToken };
