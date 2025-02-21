import {
  createNote,
  editNote,
  getAllNotes,
  deleteNote,
  updatePinned,
} from "../controllers/notes.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import express from "express";
const router = express.Router();

router.post("/add-note", createNote);
router.put("/edit-note/:noteId", editNote);
router.get("/get-all-notes", verifyToken, getAllNotes);
router.delete("/delete-note/:noteId", deleteNote);
router.put("/update-note-pinned/:noteId", updatePinned);

export default router;
