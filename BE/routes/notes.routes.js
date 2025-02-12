import {
  createNote,
  editNote,
  getAllNotes,
  deleteNote
} from "../controllers/notes.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import express from "express";
const router = express.Router();

router.post("/add-note", createNote);
router.put("/edit-note/:noteId", editNote);
router.get("/get-all-notes", getAllNotes);
router.delete("/delete-note/:noteId", deleteNote);

export default router;
