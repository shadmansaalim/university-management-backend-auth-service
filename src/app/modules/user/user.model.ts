/* eslint-disable  @typescript-eslint/no-this-alias */

// Imports
import { Schema, model } from 'mongoose';
import { UserConstants } from './user.constant';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

// User Schema
const userSchema = new Schema<IUser, UserModel>(
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
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Static Method to check whether user exists or not
userSchema.statics.exists = async function (
  id: string
): Promise<Pick<
  IUser,
  'id' | 'role' | 'password' | 'needsPasswordChange'
> | null> {
  return await User.findOne(
    { id },
    { id: 1, role: 1, password: 1, needsPasswordChange: 1 }
  ).lean();
};

// Static Method to check whether password matches or not
userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// Pre Hook function to hash user password before saving in DB
userSchema.pre('save', async function (next) {
  // Hashing user password before saving
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

// User Model
export const User = model<IUser, UserModel>('User', userSchema);
