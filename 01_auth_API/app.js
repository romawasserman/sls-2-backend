import express from "express"
import authRoute from "./routes/authRoute.js"
import createTable from "./database/createTable.js"
import meRoute from "./routes/meRoute.js"
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT;

const app = express()
createTable(process.env.TABLE_NAME)

app.use(express.json())

app.use('/auth', authRoute)

app.use('/me', meRoute)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
