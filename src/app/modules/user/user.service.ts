//Imports
import config from '../../../config'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateUserId } from './user.utils'

// Function to create a user in database
const createUser = async (user: IUser): Promise<IUser | null> => {
  // Assigning Auto generated incremental User ID
  const id = await generateUserId()
  user.id = id

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
