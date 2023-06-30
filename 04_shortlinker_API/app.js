import express from "express"
import authRoute from "./routes/authRoute.js"
import {createTables} from "./database/createTable.js"
import meRoute from "./routes/meRoute.js"
import dotenv from 'dotenv';
import myLinksRoute from "./routes/myLinksRoute.js";
import linkRedirectRoute from "./routes/linkRedirectRoute.js";

dotenv.config();
const port = process.env.PORT;

const app = express()
createTables(process.env.USERS_TABLE_NAME, process.env.LINKS_TABLE_NAME)

app.use(express.json())

app.use('/auth', authRoute)

app.use('/me', meRoute)

app.use('/mylinks', myLinksRoute)

app.use("/", linkRedirectRoute)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
