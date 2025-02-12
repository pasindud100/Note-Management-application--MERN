import express from "express";
import {
  createAccount,
  login,
  getAllUsers,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-account", createAccount);
router.post("/login", login);
router.get("/get-user", getAllUsers);

export default router;
