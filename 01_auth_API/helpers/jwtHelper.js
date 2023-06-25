import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()

export const generateJwtToken = (email) => {
  try {
    const token = jwt.sign({userEmail : email}, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    return token;
  } catch (error) {
    console.error("Error generating JWT token:", error);
    throw error;
  }
};

export const generateRefreshToken = (email) => {
  try {
    const refreshToken = jwt.sign({userEmail : email}, process.env.REFRESH_SECRET_KEY);
    return refreshToken;
  } catch (error) {
    console.error("Error generating refresh token:", error);
    throw error;
  }
};

export const decodeAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    console.error("Error decoding access token:", error);
    throw error;
  }
};

export const decodeRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.REFRESH_SECRET_KEY);
  } catch (error) {
    console.error("Error decoding refresh token:", error);
    throw error;
  }
};
