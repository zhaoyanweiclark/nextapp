import { getAppDataSource } from "../data-source"
import { User } from "../entities/user-entity"




export const allUsers = async () => {
  const AppDataSource = await getAppDataSource()
  const userRepository = AppDataSource.getRepository(User)
  return userRepository.find()
}

export const saveUser = async () => {
  const user = new User()
  user.firstName = "Timber"
  user.lastName = "Saw"
  user.age = 25

  const AppDataSource = await getAppDataSource()
  const userRepository = AppDataSource.getRepository(User)
  await userRepository.save(user)
}
