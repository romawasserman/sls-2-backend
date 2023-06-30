import express from "express"
import dotenv from "dotenv"
import { deleteItem, fetchUrl } from "../database/dbHelpers.js"
const linkRedirectRoute = express.Router()
dotenv.config()
const table = process.env.LINKS_TABLE_NAME

linkRedirectRoute.get("/:id", async (req, res) => {
  try {
    const id = req.params.id
    const originalUrl = await fetchUrl(table, id)
    console.log(originalUrl)
    return res.redirect(originalUrl[0].originalurl)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "An error occurred" })
  }
})

linkRedirectRoute.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id
    await deleteItem(table, id)
    return res.status(200).json({success: true, message: `Link with id ${id} succesfuly deleted` })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "An error occurred" })
  }
})
export default linkRedirectRoute
