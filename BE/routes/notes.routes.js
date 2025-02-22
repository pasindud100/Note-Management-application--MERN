import {
  createNote,
  editNote,
  getAllNotes,
  deleteNote,
  updatePinned,
  serarchNote,
} from "../controllers/notes.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import express from "express";
const router = express.Router();

router.post("/add-note", verifyToken, createNote);
router.put("/edit-note/:noteId", verifyToken, editNote);
router.get("/get-all-notes", verifyToken, getAllNotes);
router.delete("/delete-note/:noteId", verifyToken, deleteNote);
router.put("/update-note-pinned/:noteId", updatePinned);
router.get("/serarch-note", serarchNote);

export default router;
