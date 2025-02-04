import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullNname: {
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
  creationOn: {
    type: Date,
    default: new Date().getTime(),
  },
});

const User = mongoose.model("User", userSchema);
export default User;
