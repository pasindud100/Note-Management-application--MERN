import React from "react";

function ProfileInfo({ logout }) {
  const getInitials = (name) => {
    if (!name) {
      return "d";
    }
    const words = name.split(" ");
    let initials = "";

    for (let i = 0; i < Math.min(words.length, 2); i++) {
      initials += words[i][0];
    }
    return initials.toUpperCase();
  };
  return (
    <div className="flex items-center gap-2">
      <div className="w-12 h-12 flex items-center justify-center text-slate-900 bg-slate-300 rounded-full font-medium ">
        {getInitials("pasindu dilshan ")}
      </div>
      <div className="">
        <p className="text-sm font-medium">Pasindu Dilshan</p>
        <button className="" onClick={logout}>
          LogOut
        </button>
      </div>
    </div>
  );
}

export default ProfileInfo;
