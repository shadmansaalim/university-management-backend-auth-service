//Imports
import config from '../../../config'
import { IUser } from './user.interface'
import { User } from './user.model'

// Function to create a user in database
const createUser = async (user: IUser): Promise<IUser | null> => {
  // Auto generated incremental ID

  // Assigning Default Password if not password
  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const createdUser = User.create(user)

  // Throwing error if fails to create user
  if (!createdUser) {
    throw new Error(`Failed to create an user`)
  }

  return createdUser
}

// Exporting all functions from service file
export default {
  createUser,
}
