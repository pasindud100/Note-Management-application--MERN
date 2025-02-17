import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    console.log("Received Token:", token);

    if (!token) {
      return res
        .status(403)
        .json({ message: "Access denied, no token provided" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded Token:", decoded);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Token Verification Error:", error.message);
    return res
      .status(401)
      .json({ message: "Invalid token", error: error.message });
  }
};
