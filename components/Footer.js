import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  // Array of menus
  const menus = ["About", "Feature", "Works", "Support"];
  
  return (
    <footer className="h-auto py-4 flex flex-col items-center">
      <div className="flex justify-between items-center w-4/5 h-16">
        {/* Logo */}
        <h1 className="text-4xl font-semibold bg-gradient-to-r from-[#FD6003] to-[#FB8E0B] bg-clip-text text-transparent font-sans">
          Letschat
        </h1>
        
        {/* Center Menus */}
        <div className="flex items-center gap-8">
          {menus.map((menu, index) => (
            <a
              key={index}
              href={`#${menu.toLowerCase()}`}
              className="text-gray-700 hover:text-[#FB8E0B] transition"
            >
              {menu}
            </a>
          ))}
        </div>
        
        {/* Social Icons */}
        <div className="flex items-center gap-5">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-gray-700 hover:text-[#FB8E0B] text-xl transition" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="text-gray-700 hover:text-[#FB8E0B] text-xl transition" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-gray-700 hover:text-[#FB8E0B] text-xl transition" />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-gray-700 hover:text-[#FB8E0B] text-xl transition" />
          </a>
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="w-4/5 flex justify-between items-center mt-4 border-t pt-4 text-sm text-gray-500">
        {/* Copyright */}
        <p>© Copyright 2022, All Rights Reserved</p>
        
        {/* Privacy Links */}
        <div className="flex gap-4">
          <a
            href="/privacy-policy"
            className="hover:text-[#FB8E0B] transition"
          >
            Privacy Policy
          </a>
          <a
            href="/terms-conditions"
            className="hover:text-[#FB8E0B] transition"
          >
            Terms & Conditions
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
