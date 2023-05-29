// Imports
import { User } from './user.model'

// Function to find last user id
export const findLastUserId = async () => {
  // Finding One User and taking id only using filed filtering
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()

  return lastUser?.id
}

// Function to generate user id
export const generateUserId = async () => {
  // Getting last user id and keeping it in defaultId variable if not storing default id which is for the first user in the database
  const defaultId = (await findLastUserId()) || (0).toString().padStart(5, '0')

  // Increment defaultId by 1
  const currentId = parseInt(defaultId) + 1

  // Format current id to add starting '0's
  const formattedCurrentId = currentId.toString().padStart(5, '0')

  return formattedCurrentId
}
