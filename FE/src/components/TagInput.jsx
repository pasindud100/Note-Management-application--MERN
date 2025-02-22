import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

function TagInput({ tags, setTags }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {tags?.map((tag, index) => (
          <div key={index} className="flex items-center bg-green-400 text-white px-2 py-1 rounded-md">
            <span>{tag}</span>
            <button
              onClick={() => handleRemoveTag(tag)}
              className="ml-2 text-white hover:text-red-500"
            >
              <IoMdClose />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          className="text-sm py-2 px-2 bg-transparent border border-green-400 rounded outline-none"
          placeholder="Add tags"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          onClick={addNewTag}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
}

export default TagInput;
