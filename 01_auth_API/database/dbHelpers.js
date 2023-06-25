import { createClient } from "@supabase/supabase-js"
import dotenv from 'dotenv'
dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


export const fetchUserByEmail = async (table, email) => {
  try {
    const { data: existingUser, error } = await supabase
      .from(table)
      .select('*')
      .eq('email', email);

    if (error) {
      throw new Error('An error occurred while fetching user by email');
    }

    return existingUser;
  } catch (error) {
    throw error;
  }
};

export const insertUser = async (table, userData) => {
    try {
      const { error } = await supabase
        .from(table)
        .insert([userData]);
  
      if (error) {
        throw new Error('An error occurred while inserting user data');
      }
    } catch (error) {
      throw error;
    }
  };