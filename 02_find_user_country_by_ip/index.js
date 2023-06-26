import express from "express"
import { GetUserInfo } from "./helpers/csvParser.js"

const app = express()

app.get("/", async (req, res) => {
  const clientIP = req.headers["x-forwarded-for"]

  try {
    const result = await GetUserInfo(clientIP)
    res.send(
      `Country Code: ${result.countryCode}, Country: ${result.countryName}, IP : ${clientIP}`
    )
  } catch (error) {
    res.status(500).send("Error occurred")
  }
})

app.listen(5000, () => {
  console.log(`Server is running on port 5000`)
})
