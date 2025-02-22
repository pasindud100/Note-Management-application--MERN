import React, { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import { useNavigate } from "react-router-dom";
import Searchbar from "./Searchbar";

function Navbar({ userInfo, onSearchNote }) {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handeleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="flex items-center justify-between px-6 py-2 drop-shadow-lg bg-white">
      <h2 className=" text-xl font-medium py-2 ">Note Manager</h2>
      <Searchbar
        value={searchQuery}
        onchange={({ target }) => {
          setSearchQuery(target.value);
        }}
        clearSearch={clearSearch}
        search={handeleSearch}
      />
      <ProfileInfo userInfo={userInfo} logout={logout} />
    </div>
  );
}

export default Navbar;
