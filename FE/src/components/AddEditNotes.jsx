import React, { useState } from "react";
import TagInput from "./TagInput";
import { IoMdClose } from "react-icons/io";
import axiosInstance from "../utils/axiosInstancs";

function AddEditNotes({
  noteDate,
  type,
  getAllNotes,
  onClose,
  showToastMessage,
}) {
  const [title, setTitle] = useState(noteDate?.title || "");
  const [content, setContent] = useState(noteDate?.content || "");
  const [tags, setTags] = useState(noteDate?.tags || []);
  const [err, setErr] = useState(null);

  // this for add note
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/api/notes/add-note", {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        showToastMessage("Note added successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErr(error.response.data.message);
      } else {
        setErr("An unexpected error occurred");
      }
    }
  };

  // Edit note
  const editNote = async () => {
    const noteId = noteDate._id;

    try {
      const response = await axiosInstance.put(
        "/api/notes/edit-note/" + noteId,
        {
          title,
          content,
          tags,
          isPinned: noteDate?.isPinned || false, 
        }
      );

      if (response.data && response.data.note) {
        showToastMessage("Note updated successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErr(error.response.data.message);
      } else {
        setErr("An unexpected error occurred");
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setErr("Please set a title for your note.");
      return;
    }
    if (!content) {
      setErr("Please set the content of the note.");
      return;
    }
    setErr("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative">
      <button
        onClick={onClose}
        className="flex items-center justify-center w-10 h-10 absolute -top-3 -right-3 rounded-full text-slate-500 hover:text-slate-900"
      >
        <IoMdClose />
      </button>
      <div className="flex flex-col gap-3">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-700 outline-none"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-3 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          type="text"
          placeholder="Enter content here"
          rows={10}
          className="text-sm outline-none bg-slate-200 border-slate-100 p-2 rounded text-slate-700"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <div className="mt-4">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      {err && <p className="text-red-500 text-xs">{err}</p>}
      <button className="btn-primary my-5 font-medium" onClick={handleAddNote}>
        {type === "edit" ? "Update note" : "Add note"}
      </button>
    </div>
  );
}

export default AddEditNotes;
