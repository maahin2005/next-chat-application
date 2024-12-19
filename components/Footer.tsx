import React from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  // Array of menus
  const menus: string[] = ["About", "Feature", "Works", "Support"];

  return (
    <footer className="py-8 px-4 min-h-[400px] flex flex-col items-center bg-gray-50">
      {/* Top Section */}
      <div className="text-center mb-8">
        <h3 className="text-5xl font-kanit font-medium my-10">
          Ready to grow your business?
          <br />
          Start with Apex, become faster <br /> every second
        </h3>
        <Link href="/chat">
          <button className="px-6 py-3 bg-contractColor-light text-white rounded-lg hover:bg-contractColor-dark transition">
            Start Chatting Now
          </button>
        </Link>
      </div>

      {/* Middle Section */}
      <div className="flex flex-wrap justify-between items-center w-full max-w-6xl mb-6 gap-6">
        {/* Logo */}
        <Link href="/" className="text-4xl font-semibold font-sans bg-gradient-to-r from-contractColor-dark to-contractColor-light bg-clip-text text-transparent cursor-pointer">
          Letschat
        </Link>

        {/* Center Menus */}
        <div className="flex items-center gap-8 flex-wrap justify-center">
          {menus.map((menu, index) => (
            <Link
              key={index}
              href={`#${menu.toLowerCase()}`}
              className="text-gray-700 hover:text-contractColor-dark transition"
            >
              {menu}
            </Link>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-5 justify-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram className="text-gray-700 hover:text-contractColor-dark text-xl transition" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebookF className="text-gray-700 hover:text-contractColor-dark text-xl transition" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter className="text-gray-700 hover:text-contractColor-dark text-xl transition" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Github"
          >
            <FaGithub className="text-gray-700 hover:text-contractColor-dark text-xl transition" />
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full max-w-6xl flex flex-wrap justify-between items-center border-t pt-4 text-sm text-gray-500">
        {/* Copyright */}
        <p className="text-center w-full md:w-auto">
          © Copyright 2022, All Rights Reserved
        </p>

        {/* Privacy Links */}
        <div className="flex gap-4 mt-2 md:mt-0">
          <Link href="/privacy-policy" className="hover:text-[#FB8E0B] transition">
            Privacy Policy
          </Link>
          <Link href="/terms-conditions" className="hover:text-[#FB8E0B] transition">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
