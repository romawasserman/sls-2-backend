import express from "express"
import bucketRouter from "./routes/bucketRoute.js"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()
const app = express()

app.use(express.json())
app.use("/", bucketRouter)

mongoose.connect(process.env.API_KEY)
app.listen(5000, () => {
  console.log(`Server is running on port 5000`)
})
