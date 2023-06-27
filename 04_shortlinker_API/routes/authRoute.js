import express from "express"
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid"
import { generateJwtToken, generateRefreshToken } from "../helpers/jwtHelper.js"
import { fetchUserByEmail, insertUser } from "../database/dbHelpers.js"
import dotenv from 'dotenv'
dotenv.config()
const authRoute = express.Router()

const table = process.env.USERS_TABLE_NAME

authRoute.post("/sign-up", async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, error: "Email and password required" })
  }

  try {
    const existingUser = await fetchUserByEmail(table, email)

    if (existingUser && existingUser.length > 0) {
      return res
        .status(409)
        .json({ success: false, error: "Email already exists" })
    }

    const hashedPass = await bcrypt.hash(password, 10)
    const userId = uuidv4()
    const accessToken = generateJwtToken(email)
    const refreshToken = generateRefreshToken(email)
    const userData = { id: userId, email, password: hashedPass }
    await insertUser(table, userData)
    return res
      .status(201)
      .json({ success: true, data: { accessToken, refreshToken, id: userId } })
  } catch (error) {
    return res.status(500).json({ error: "An error occurred" })
  }
})

authRoute.post("/sign-in", async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, error: "Email and password required" })
  }

  try {
    const existingUser = await fetchUserByEmail(table, email)
    if (!existingUser || existingUser.length === 0) {
      return res.status(404).json({ success: false, error: "User not found" })
    }
    const correctPass = await bcrypt.compare(password, existingUser[0].password)
    if (!correctPass) {
      return res
        .status(401)
        .json({ success: false, error: "Password incorrect" })
    }
    const accessToken = generateJwtToken(email)
    const refreshToken = generateRefreshToken(email)
    return res.status(201).json({
      success: true,
      data: { accessToken, refreshToken, id: existingUser.id },
    })
  } catch (error) {
    return res.status(500).json({ success: false, error: "An error occurred" })
  }
})

export default authRoute
