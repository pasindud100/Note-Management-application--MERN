import cors from "cors";
import express from "express";

import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { authenticateToken } from "./utilities.js";
import User from "./models/user.model.js";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: "*", //this  allow for server to accept requests from different origin..
  })
);
app.use(express.json()); //this is a middleware to parse incoming request with json payloads..

const Port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

app.get("/", (req, res) => {
  res.json("Hello World!");
});

//create account
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName) {
    return res.json({ message: "Fullname is required" });
  }
  if (!email) {
    return res.json({ message: "Email is required" });
  }
  if (!password) {
    return res.json({ message: "Password is required" });
  }

  const isUser = await User.findOne({ email: email });
  if (isUser) {
    return res.json({ error: true, message: "User already exists" });
  }
  const user = new User({
    fullName,
    email,
    password,
  });
  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5m",
  });
  return res.json({
    error: false,
    message: "Account created successfully",
    accessToken,
    user,
  });
});

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
