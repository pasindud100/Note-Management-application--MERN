import React from "react";
import Navbar from "../../components/Navbar";
import NoteCard from "../../components/NoteCard";

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
    </div>
  );
}

export default Home;
