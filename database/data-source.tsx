import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entities/user-entity"

const dataSource = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: true,
  entities: [
    User
  ],
  subscribers: [],
  migrations: [],
}

export const getAppDataSource = async () => {
  const AppDataSource = new DataSource(dataSource)
  try {
    await AppDataSource.initialize()
    return AppDataSource
  } catch (err) {
    console.error(err)
  }
}
