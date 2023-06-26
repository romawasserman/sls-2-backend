import express from "express"
import { getItemFromDb, postItemToDb } from "../database/dbLogic.js"

const bucketRouter = express.Router()

bucketRouter.post("/:bucket/:name", async (req, res) => {
  try {
    const bucket = req.params.bucket
    const name = req.params.name
    const data = req.body

    await postItemToDb(bucket, { [name]: data })
    
    res.status(201).send({ bucket, name, data })
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" })
  }
})

bucketRouter.get("/:bucket/:name", async (req, res) => {
  try {
    const bucket = req.params.bucket
    const name = req.params.name

    const result = await getItemFromDb(bucket, name)

    res.status(200).send(result)
  } catch (error) {
    res.status(404).send({ message: "Item not found" })
  }
})

export default bucketRouter
