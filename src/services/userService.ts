import { User } from '../models'

const getUsers = async () => {
  const users = await User.find({})
  console.log(users)

  return users
}

const getUserById = async (id: string) => {
  return await User.findById(id)
}

export default { getUsers, getUserById }
