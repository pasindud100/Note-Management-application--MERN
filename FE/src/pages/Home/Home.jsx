import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import NoteCard from "../../components/NoteCard";
import { FaPlus } from "react-icons/fa";
import AddEditNotes from "../../components/AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstancs";

function Home() {
  const [openAddEditModel, setOpenAddEditModel] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  //get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getUserInfo();
    return () => {};
  }, []);

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
        />
      </Modal>
    </div>
  );
}

export default Home;
