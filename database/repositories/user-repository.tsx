import { getAppDataSource } from "@/database/data-source"
import { User } from "@/database/entities/user-entity"
import { DataSource } from "typeorm"

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

export const updateUser = async (id: number) => {
  const AppDataSource = await getAppDataSource()
  const userRepository = AppDataSource.getRepository(User)
  const userToUpdate = await userRepository.findOneBy({ id })
  if (!userToUpdate) {
    throw new Error("User not exists")
  }
  userToUpdate.firstName = `Nikki-${new Date().getTime()}`
  await userRepository.save(userToUpdate)
}

export const deleteUser = async (id: number) => {
  const AppDataSource = await getAppDataSource()
  const userRepository = AppDataSource.getRepository(User)
  const userToDelete = await userRepository.findOneBy({ id })
  if (!userToDelete) {
    throw new Error("User not exists")
  }
  await userRepository.remove(userToDelete)
}
