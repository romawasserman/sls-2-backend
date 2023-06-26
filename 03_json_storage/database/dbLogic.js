import { UserModel } from "./UserModel.js"

export async function postItemToDb(bucket, newData) {
  try {
    const key = Object.keys(newData)[0]
    const value = Object.values(newData)[0]
    const updateFields = {
      [`userData.${key}`]: value,
    }

    await UserModel.updateOne(
      { bucket: bucket },
      { $set: updateFields },
      { upsert: true }
    )
  } catch (error) {
    console.log("Error:", error)
    throw error
  }
}

export async function getItemFromDb(bucket, key) {
  try {
    const user = await UserModel.findOne({ bucket: bucket }, `userData.${key}`)
    if (user && user.userData && user.userData[key]) {
      const value = user.userData[key]
      return value
    } else {
      throw new Error("Key or userData not found")
    }
  } catch (error) {
    console.log("Error:", error)
    throw error
  }
}
