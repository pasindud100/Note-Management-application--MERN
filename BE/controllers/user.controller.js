import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";

export const createAccount = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required..." });
  }

  try {
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(409).json({ message: "User already exists..." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullName, email, password: hashedPassword });
    await user.save();

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5m" }
    );

    res.status(201).json({
      error: false,
      message: "Account created successfully",
      user,
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

//login
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required..." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials..Please provide connrect password...",
      });
    }

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "5m",
    });

    return res.json({
      error: false,
      message: "Login successful",
      user,
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
