import cors from "cors";
import express from "express";

import mongoose from "mongoose";
import dotenv from "dotenv";

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
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
