"use client";
import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { redirect } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const router = useRouter();

  const handleRedirect = () => {
    redirect(`/`); // Replace '/login' with the desired route
  };

  // Array of menus
  const menus = ["Demos", "About", "Blogs", "Pages", "Contact"];

  return (
    <nav className="h-16 flex justify-center items-center relative">
      <div className="flex justify-between items-center w-4/5 h-full">
        <h1
          onClick={handleRedirect}
          className="cursor-pointer text-4xl font-semibold bg-gradient-to-r from-contractColor-light to-contractColor-dark bg-clip-text text-transparent font-sans"
        >
          Letschat
        </h1>

        {/* Center Menus for Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {menus.map((menu, index) => (
            <a
              key={index}
              href={`#${menu.toLowerCase()}`}
              className="text-gray-700 hover:text-contractColor-dark transition"
            >
              {menu}
            </a>
          ))}
        </div>

        {/* Login and Get Started buttons for Desktop */}
        <div className="hidden md:flex items-center gap-5">
          <h1 className="text-gray-700">Login</h1>
          <button className="min-w-36 w-full p-2 h-full bg-contractColor-light hover:bg-contractColor-dark text-white rounded-md">
            Get Started free
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div
          className="md:hidden text-2xl cursor-pointer z-10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute left-0 right-0 top-16 flex flex-col items-center gap-4 py-4 shadow-lg bg-white z-20">
          {menus.map((menu, index) => (
            <a
              key={index}
              href={`#${menu.toLowerCase()}`}
              className="text-gray-700 hover:text-[#FB8E0B] transition w-full text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              {menu}
            </a>
          ))}
          <h1 className="cursor-pointer text-gray-700 hover:text-[#FB8E0B] transition w-full text-center">
            Login
          </h1>
          <button className="min-w-36 px-4 py-2 bg-[#FB8E0B] text-white rounded-md hover:bg-[#FD6003] transition w-full text-center">
            Get Started Free
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
