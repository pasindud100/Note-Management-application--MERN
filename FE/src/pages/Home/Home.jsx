import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import NoteCard from "../../components/NoteCard";
import { FaPlus } from "react-icons/fa";
import AddEditNotes from "../../components/AddEditNotes";
import Modal from "react-modal";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstancs";

function Home() {
  const [openAddEditModel, setOpenAddEditModel] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const navigate = useNavigate();

  // Get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Get all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/api/notes/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred...please try again..");
    }
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  return (
    <div>
      <Navbar userInfo={userInfo} />

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          {allNotes.map((item) => (
            <NoteCard
              key={item._id} // Use a unique key, preferably the _id
              title={item.title}
              date={item.createdOn}
              content={item.content}
              tags={item.tags} // Ensure to use the correct property name
              isPinned={item.isPinned}
              onEdit={() => {}} // Implement edit functionality
              onDelete={() => {}} // Implement delete functionality
              onPinNote={() => {}} // Implement pin functionality
            />
          ))}
        </div>
      </div>

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
        <AddEditNotes
          type={openAddEditModel.type}
          noteDate={openAddEditModel.data}
          onClose={() => {
            setOpenAddEditModel({ isShown: false, type: "add", data: null });
          }}

          getAllNotes ={getAllNotes}
        />
      </Modal>
    </div>
  );
}

export default Home;