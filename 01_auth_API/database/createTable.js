import pkg from "pg"
const { Pool } = pkg
import dotenv from 'dotenv';

dotenv.config();
const pgPool = new Pool({
  connectionString:
  process.env.CONNECTION_STRING,
})

const createTable = async (table) => {
  const tableName = table

  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id UUID PRIMARY KEY,
        email TEXT UNIQUE,
        password TEXT
      )
    `

  try {
    const client = await pgPool.connect()
    await client.query(createTableQuery)
    client.release()
  } catch (error) {
    console.error("Error creating table:", error.message)
  }
}
export default createTable
