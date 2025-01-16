import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

function SearchFriends() {
  return (
    <div className="w-[90%] sm:4/5 md:w-1/2 m-auto">
      <div className="flex justify-center bg-slate-100 h-16 items-center mx-5 px-6 m-auto rounded-full gap-3">
        <FaMagnifyingGlass className="text-slate-500 text-xl" />
        <input
          placeholder="search contacts and conversations"
          className="w-[95%] m-auto bg-transparent outline-none"
        />
      </div>
    </div>
  );
}

export default SearchFriends;
