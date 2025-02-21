import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  creationOn: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
export default User;
