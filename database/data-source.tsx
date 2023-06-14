import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"
import { User } from "@/database/entities/user-entity"

let appWriteDataSource: DataSource
export async function getAppWriteDataSource(): Promise<DataSource> {
  if (appWriteDataSource) {
    return appWriteDataSource
  }
  const writeDataSource: DataSourceOptions = {
    type: "postgres",
    host: process.env.POSTGRES_HOST_WRITE,
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: false,
    entities: [
      User
    ],
    subscribers: [],
    migrations: [],
  }
  appWriteDataSource = new DataSource(writeDataSource)
  try {
    await appWriteDataSource.initialize()
    console.log("db write connected!")
    return appWriteDataSource
  } catch (err) {
    console.error(err)
    throw err
  }
}

let appReadDataSource: DataSource
export async function getAppReadDataSource(): Promise<DataSource> {
  if (appReadDataSource) {
    return appReadDataSource
  }
  const readDataSource: DataSourceOptions = {
    type: "postgres",
    host: process.env.POSTGRES_HOST_READ,
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: false,
    entities: [
      User
    ],
    subscribers: [],
    migrations: [],
  }
  appReadDataSource = new DataSource(readDataSource)
  try {
    await appReadDataSource.initialize()
    console.log("db read connected!")
    return appReadDataSource
  } catch (err) {
    console.error(err)
    throw err
  }
}