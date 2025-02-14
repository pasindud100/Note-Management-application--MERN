import express from "express";
import {
  createAccount,
  login,
  getAllUsers,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-account", createAccount); // Removed verifyToken
router.post("/login", login); // Removed verifyToken
router.get("/get-user", verifyToken, getAllUsers); // Keep verifyToken for this route

export default router;
