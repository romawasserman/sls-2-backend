import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"
dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export const fetchUserByEmail = async (table, email) => {
  try {
    const { data: existingUser } = await supabase
      .from(table)
      .select("*")
      .eq("email", email)
    return existingUser
  } catch (error) {
    throw error
  }
}

export const insertUser = async (table, userData) => {
  try {
    await supabase.from(table).insert([userData])
  } catch (error) {
    throw error
  }
}

export const insertLink = async (table, linkData) => {
  try {
    await supabase.from(table).insert([linkData])
  } catch (error) {
    throw error
  }
}

export const deleteItem = async (table, id) => {
  try {
    await supabase.from(table).delete().eq("id", id)
  } catch (err) {
    throw err
  }
}

export const fetchUrl = async (table, id) => {
  try {
    const { data: originalUrl } = await supabase
      .from(table)
      .select("originalurl")
      .eq("id", id)
    return originalUrl
  } catch (err) {
    throw err
  }
}
