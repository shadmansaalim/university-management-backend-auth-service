// Imports
import { Schema, Model, model } from 'mongoose'
import { IUser } from './user.interface'

// User Model Type
type UserModel = Model<IUser, object>

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
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// User Model
export const User = model<IUser, UserModel>('User', userSchema)
