import express from "express";
import { createAccount, login } from "../controllers/user.controller.js";  // Import the login controller
import { verifyToken } from "../middlewares/authMiddleware.js";  // Import the auth middleware

const router = express.Router();

// Public routes
router.post("/create-account", createAccount);
router.post("/login", login);

// Protected route (requires token)
router.get("/profile", verifyToken, (req, res) => {
  res.status(200).json({
    message: "Welcome to your profile!",
    user: req.user,  // This contains decoded token data
  });
});

export default router;
