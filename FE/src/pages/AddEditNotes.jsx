import React from "react";

function AddEditNotes() {
  return (
    <div>
      <div className="flex flex-col  gap-3">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-700 outline-none "
          placeholder="Enter title here"
        />
      </div>
      <div className="flex flex-col gap-3 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          type="text"
          placeholder="Enter content here"
          rows={10}
          className="text-sm outline-none bg-slate-200 border-slate-100 p-2 rounded text-slate-700 "
        ></textarea>
      </div>
      <div className="mt-4">
        <label className="input-label"> TAGS</label>
      </div>
      <button className="btn-primary  my-5 font-medium " onClick={() => {}}>
        save Note
      </button>
    </div>
  );
}

export default AddEditNotes;
