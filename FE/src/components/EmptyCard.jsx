import React from "react";

function EmptyCard({ imgSrc, message }) {
  return (
    <div className="flex flex-col items-center  justify-center mt-20">
      <img src={imgSrc} className="w-60" alt="no notes" />

      <p className="w-1/2 text-sm font-medium  text-slate-600 text-center  mt-5"></p>
    </div>
  );
}

export default EmptyCard;
