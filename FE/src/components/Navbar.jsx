import React, { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import { useNavigate } from "react-router-dom";
import Searchbar from "./Searchbar";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const logout = () => {
    navigate("/login");
  };

  const search = () => {};
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
        search={search}
      />
      <ProfileInfo logout={logout} />
    </div>
  );
}

export default Navbar;
