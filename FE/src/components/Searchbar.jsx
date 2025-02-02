import React from "react";
import { IoMdSearch } from "react-icons/io";
import { IoIosClose } from "react-icons/io";

function Searchbar({ value, onchange, clearSearch, search }) {
  return (
    <div className="flex items-center w-80 px-4 rounded-md bg-slate-100">
      <input
        type="text"
        placeholder="Search notes here"
        className="w-full bg-transparent outline-none py-[10px] text-sm"
        value={value}
        onChange={onchange}
      />
      {value && (
        <IoIosClose
          onClick={clearSearch}
          className="cursor-pointer text-slate-500  hover:text-slate-900 text-xl"
        />
      )}

      <IoMdSearch
        onClick={search}
        className="cursor-pointer text-slate-500  hover:text-slate-900 text-xl"
      />
    </div>
  );
}

export default Searchbar;
