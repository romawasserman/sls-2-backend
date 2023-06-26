import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  bucket: {
    type: String,
    required: true,
    unique: true
  },
  userData: {
    type: Object,
    required: true
  }
});

export const UserModel = mongoose.model('User', userSchema);