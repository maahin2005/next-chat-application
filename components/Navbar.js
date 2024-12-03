import React from "react";

const Navbar = () => {
  return (
    <nav className="h-16  flex justify-center items-center">
      <div className="flex justify-between items-center w-4/5 h-full">
        <h1 className="text-4xl font-semibold bg-gradient-to-r from-[#FD6003] to-[#FB8E0B] bg-clip-text text-transparent font-sans">
          Letschat
        </h1>
        <div></div>
        <div className="flex items-center gap-5">
          <h1>Login</h1>
          <button className="min-w-36 w-full p-2 h-full bg-[#FB8E0B] text-white rounded-md">
            Get Started free
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
