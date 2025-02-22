import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";

// export const createAccount = async (req, res) => {
//   try {
//     const { fullName, email, password } = req.body;

//     if (!fullName || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const isUser = await User.findOne({ email });
//     if (isUser) {
//       return res.status(409).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ fullName, email, password: hashedPassword });
//     await user.save();

//     return res.status(201).json({
//       error: false,
//       message: "Account created successfully",
//     });
//   } catch (error) {
//     console.error("Signup Error:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

export const createAccount = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required..." });
  }

  try {
    const isUser  = await User.findOne({ email });
    if (isUser ) {
      return res.status(409).json({ message: "User  already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullName, email, password: hashedPassword });
    await user.save();

    return res.json({
      error: false,
      message: "Account created successfully",
    });
  } catch (error) {
    console.error("Signup Error:", error); 
    return res.status(500).json({ message: "Internal server error", error });
  }
};

    // const accessToken = jwt.sign(
    //   { id: user._id },
    //   process.env.ACCESS_TOKEN_SECRET,
    //   {
    //     expiresIn: "15m",
    //   }
    // );

 
//loginimport jwt from "jsonwebtoken";

// Login
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
      return res.status(404).json({ message: "User  not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials..Please provide correct password...",
      });
    }

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );

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

//get all users

export const getAllUsers = async (req, res) => {
  try {
    console.log("Request received at /get-user");
    console.log("Decoded user from token:", req.user);

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: No valid user" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      user: {
        fullName: user.fullName,
        email: user.email,
        _id: user._id,
      },
      message: "User retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
