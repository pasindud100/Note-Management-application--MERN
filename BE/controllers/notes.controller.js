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
