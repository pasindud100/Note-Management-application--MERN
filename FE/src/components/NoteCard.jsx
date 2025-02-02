import React from "react";
import { TbPinned } from "react-icons/tb";

function NoteCard({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) {
  return (
    <div className="border rounded bg-white p-4 m-4 hover:shadow-xl transition-all ease-in-out duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h5 className="font-medium text-sm">{title}</h5>
          <span className="text-slate-600 text-xs">{date}</span>
        </div>
        <TbPinned
          onChange={onPinNote}
          className={`icon-btn ${isPinned ? "text-primary" : "text-slate-300"}`}
        />
      </div>
      <p className="text-slate-600 text-sm mt-2">{content?.slice(0, 60)}</p>

      <div className="flex justify-between items-center mt-4 ">
        <div className="text-xs text-slate-600">{tags}</div>
        <div className="flex items-center gap-2"></div>
      </div>
    </div>
  );
}

export default NoteCard;
