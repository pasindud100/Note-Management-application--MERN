import React from "react";
import Navbar from "../../components/Navbar";
import NoteCard from "../../components/NoteCard";
import { FaPlus } from "react-icons/fa";

function Home() {
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
      <button className="w-12 h-12 flex items-center justify-center bg-green-500 rounded-lg fixed  bottom-4 right-4">
        <FaPlus className="text-white"/>
      </button>
    </div>
  );
}

export default Home;
