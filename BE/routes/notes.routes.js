import { createNote,editNote } from "../controllers/notes.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import express from "express";
const router = express.Router();

router.post("/add-note", createNote);
router.put("/edit-note/:noteId")

export default router;
