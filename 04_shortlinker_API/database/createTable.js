import pkg from "pg"
const { Pool } = pkg
import dotenv from 'dotenv';

dotenv.config();
const pgPool = new Pool({
  connectionString:
  process.env.CONNECTION_STRING,
})

export const createTables = async (usersTable, linksTable) => {
  const tableName = usersTable

  const createUsersTableQuery = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id UUID PRIMARY KEY,
        email TEXT UNIQUE,
        password TEXT
      )
    `
    const createLinksTableQuery = `
    CREATE TABLE IF NOT EXISTS ${linksTable} (
      id TEXT PRIMARY KEY,
      email TEXT ,
      originalUrl TEXT
    )
  `


  try {
    const client = await pgPool.connect()
    await client.query(createUsersTableQuery)
    await client.query(createLinksTableQuery)
    client.release()
  } catch (error) {
    console.error("Error creating table:", error.message)
  }
}

