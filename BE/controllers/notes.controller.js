import Note from "../models/notes.model.js";

export const createNote = async (req, res) => {
  const { title, content, tags } = req.body;

  if (!title) {
    return res.status(400).json({ error: true, message: "Title is required" });
  }
  if (!content) {
    return res
      .status(400)
      .json({ error: true, message: "Content is required" });
  }

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: req.user._id,
    });
    await note.save();
    return res.json({
      error: false,
      note,
      message: "Note created successfully",
    });
  } catch (error) {
    console.error("Error creating note:", error);
    return res.status(500).json({
      error: true,
      message: "Internal server error...",
    });
  }
};

// Edit an existiting note
export const editNote = async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, tags, isPinned } = req.body;

  if (!title || !content || !tags) {
    return res
      .status(400)
      .json({ error: true, message: "No changes provided" });
  }

  try {
    const note = await Note.findOne({ _id: noteId, userId: req.user._id });
    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    note.title = title;
    note.content = content;
    note.tags = tags;
    note.isPinned = isPinned;

    await note.save();
    return res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (err) {
    console.error("Error updating note:", err);
    return res.status(500).json({
      error: true,
      message: "Internal server error...",
    });
  }
};

// get all notes
export const getAllNotes = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: true, message: "Unauthorized" });
  }

  console.log("User ID:", req.user._id);

  try {
    const notes = await Note.find();
    console.log("Fetched Notes:", notes);
    return res.json({
      error: false,
      notes,
      message: "Notes fetched successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: true, message: "Internal server error..." });
  }
};

//delete notes
export const deleteNote = async (req, res) => {
  const noteId = req.params.noteId;

  try {
    const note = await Note.findOne({ _id: noteId, userId: req.user._id });
    if (!note) {
      return res.status(404).json({
        error: true,
        message: "Note not found for delete",
      });
    }

    await note.deleteOne();
    return res.json({
      error: false,
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting note:", error);
    return res.status(500).json({
      error: true,
      message: "Internal server error...",
    });
  }
};

//update is pinned
export const updatePinned = async (req, res) => {
  const noteId = req.params.noteId;
  const { isPinned } = req.body;
  const { user } = req.user;

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    note.isPinned = isPinned;

    await note.save();
    return res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Internal server error...",
    });
  }
};

export const searchNote = async (req, res) => {
  const query = req.query.query; 

  if (!query) {
    return res.status(400).json({
      error: true,
      message: "Search query is required.",
    });
  }
  try {
    const matchingNote = await Note.find({
      userId: req.user._id, 
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } }, 
      ],
    });

    return res.json({
      error: false,
      notes: matchingNote, // this from note to notes
      message: "Searched notes matched successfully",
    });
  } catch (error) {
    console.error("Error searching notes:", error); 
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};
