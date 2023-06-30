import express from "express"
import dotenv from "dotenv"
import authenticateToken from "../middleware/autheticateToken.js"
import crypto from "node:crypto"
import { fetchUserByEmail, insertLink } from "../database/dbHelpers.js"
dotenv.config()

const myLinksRoute = express.Router()

const table = process.env.LINKS_TABLE_NAME

myLinksRoute.post("/", authenticateToken, async (req, res) => {
  try {
    const urlPattern = /^(http|https):\/\/[^ "]+$/;
    const urlString = req.protocol + '://' + req.get('host');
    const userEmail = req.userEmail
    const { originalUrl } = req.body
    if (!originalUrl || !urlPattern.test(originalUrl)) {
      return res.status(500).json({ error: "originalURL missing or invalid" })
      }
    const shortId = crypto.randomBytes(3).toString("hex")
    const linkData = { id: shortId, email: userEmail, originalurl : originalUrl }
    await insertLink(table, linkData)
    return res
      .status(201)
      .json({ success: true, data: { originalurl : originalUrl, userEmail, link: `${urlString}/${shortId}` } })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "An error occurred" })
  }
})

myLinksRoute.get("/", authenticateToken, async (req, res) => {
  try {
    const userEmail = req.userEmail
    console.log(userEmail);
    const links = await fetchUserByEmail(table, userEmail)
    return res
      .status(200)
      .json({ success: true, links })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "An error occurred" })
  }
})

// myLinksRoute.delete("/", authenticateToken, async (req, res) => {
//   try {
//     const userEmail = req.userEmail
//     const links = await fetchUserByEmail(table, userEmail)
//     return res
//       .status(200)
//       .json({ success: true, links })
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: "An error occurred" })
//   }
// })

export default myLinksRoute
