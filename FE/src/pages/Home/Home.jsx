import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import NoteCard from "../../components/NoteCard";
import { FaPlus } from "react-icons/fa";
import AddEditNotes from "../AddEditNotes";
import Modal from "react-modal";

// Set Modal Root (Only needed once in your app)
Modal.setAppElement("#root");

function Home() {
  const [openAddEditModel, setOpenAddEditModel] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  return (
    <div>
      <Navbar />

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <NoteCard
            title="Note 1"
            date="2022-01-01"
            content="This is the content of note 1"
            tags="#tag1, #tag2"
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
        </div>
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() =>
          setOpenAddEditModel({ isShown: true, type: "add", data: null })
        }
        className="w-12 h-12 flex items-center justify-center bg-green-500 rounded-lg fixed bottom-4 right-4 shadow-lg hover:bg-green-600"
      >
        <FaPlus className="text-white text-lg" />
      </button>

     
      <Modal
        isOpen={openAddEditModel.isShown} 
        onRequestClose={() =>
          setOpenAddEditModel({ isShown: false, type: "add", data: null })
        }
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
        contentLabel="Add or Edit Note"
        className="w-[40%] max-h-3/4 bg-white mx-auto mt-14 rounded-lg p-5 overflow-y-auto"
      >
        <AddEditNotes />
        <button
          onClick={() =>
            setOpenAddEditModel({ isShown: false, type: "add", data: null })
          }
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Close
        </button>
      </Modal>
    </div>
  );
}

export default Home;
