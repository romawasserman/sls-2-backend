import express from "express"
import { fetchUserByEmail } from "../database/dbHelpers.js"
import authenticateToken from "../middleware/autheticateToken.js"
import dotenv from 'dotenv'
dotenv.config()
const table = process.env.TABLE_NAME
const meRoute = express.Router()


meRoute.get("/", authenticateToken, async (req, res) => {
  const userEmail = req.userEmail
  try {
    const existingUser = await fetchUserByEmail(table, userEmail)

    return res
      .status(200)
      .json({ id: existingUser[0].id, email: existingUser[0].email })
  } catch (error) {
    return res.status(404).json({ success: false, error: "User not found" })
  }
})

export default meRoute
