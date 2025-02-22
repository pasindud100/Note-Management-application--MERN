import React, { useEffect } from "react";
import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";

function ToastMessage({ isShown, message, type, onClose }) {
  useEffect(() => {});

  return (
    <div
      className={`absolute top-20 right-6 transition-all duration-500 ${
        isShown ? "opacity-50" : "opacity-100"
      }`}
    >
      <div
        className={`min-w-50 bg-white border shadow-md  rounded-md after:w-[5px] after:h-full ${
          type === "delete" ? "after:bg-red-500" : "after:bg-gray-500"
        } after:absolute after:left-0 after:top-0 after:rounded-lg`}
      >
        <div className="flex items-center gap-3 py-2 px-4">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full  ${
              type === "delete" ? "bg-red-400" : "bg-green-300"
            }}`}
          >
            {type === "delete" ? (
              <MdDeleteOutline className="text-xl text-red-500" />
            ) : (
              <LuCheck className="text-xl text-green-500" />
            )}
          </div>
          <p className="text-sm text-slate-700 ">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default ToastMessage;
