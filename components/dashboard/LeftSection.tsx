import React from "react";
import { RiHome9Fill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { RiContactsFill } from "react-icons/ri";
import ContactList from "./ContactList";
import { FaMagnifyingGlass } from "react-icons/fa6";

const LeftSection: React.FC = () => {
  return (
    <div className="relative h-full">
      <h1 className="text-slate-500 font-kanit my-5 text-sm flex items-center gap-2">
        {" "}
        <RiContactsFill /> MY FRIENDS
      </h1>
      <div className="w-full my-2">
        <div className="flex justify-center items-center bg-slate-100 px-3 m-auto rounded-md">
          <FaMagnifyingGlass />
          <input
            placeholder="search friend"
            className="w-[90%] m-auto p-2 bg-transparent outline-none"
          />
        </div>
      </div>
      <div className="max-h-[70%]">
        <ContactList />
      </div>

      <div className="absolute bottom-0 w-full">
        <button className="bg-blue-500 flex items-center justify-center gap-3 text-white text-semibold rounded-3xl h-12 w-full">
          Create Contact <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default LeftSection;
