// Imports
import { Schema, model } from 'mongoose';
import { UserConstants } from './user.constant';
import { IUser, UserModel } from './user.interface';

// User Schema
const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: UserConstants.userRoles,
    },
    password: {
      type: String,
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// User Model
export const User = model<IUser, UserModel>('User', userSchema);
