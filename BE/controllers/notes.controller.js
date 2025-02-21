import Note from "../models/notes.model.js";

export const createNote = async (req, res) => {
  const { title, content, tags } = req.body;
  // const {user} = req.user;

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
    });
    await note.save();
    res.json({
      error: false,
      note,
      message: "Note created successfully",
    });
  } catch (error) {
    console.error(error); // Log the error to console for debugging
    res.status(500).json({
      error: true,
      message: "Internal server error...",
    });
  }
};

//update notes
export const editNote = async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, tags, isPinned } = req.body;
  const { user } = req.user;

  if (!title || !content || !tags) {
    return res
      .status(400)
      .json({ error: true, message: "No changes provided" });
  }
  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }
    if (title) {
      note.title = title;
    }
    if (content) {
      note.content = content;
    }
    if (tags) {
      note.tags = tags;
    }
    if (isPinned) {
      note.isPinned = isPinned;
    }
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

// get all notes
export const getAllNotes = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: true, message: "Unauthorized" });
  }

  console.log("User ID:", req.user._id); // Log the user ID

  try {
    const notes = await Note.find();
    console.log("Fetched Notes:", notes); // Log the fetched notes
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
  const { user } = req.user;
  const noteId = req.params.noteId;
  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note) {
      return res.status.json({
        error: true,
        message: "Note not found for delete",
      });
    }
    await note.deleteOne({ _id: noteId, userId: user._id });
    return res.status.json({
      error: false,
      message: "Note deleted successfully",
    });
  } catch (error) {
    return res.status.json({
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
