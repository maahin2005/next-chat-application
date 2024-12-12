import Image from "next/image";
import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center p-6 lg:p-12">
      <div className="w-full lg:w-1/2 mb-6 lg:mb-0  lg:mr-20">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
          Start chatting with anyone, anytime, with our Chat App
        </h1>
        <p className="text-base lg:text-lg text-gray-500 mb-6">
          Great software that allows you to chat from any place at any time without any interruption.
        </p>
        <button className="px-6 py-3 bg-[#FB8E0B] text-white rounded-lg hover:bg-[#FB8E55]">
          Start Chatting Now
        </button>
      </div>
      <div className="w-full lg:w-1/2">
        <Image
          src="https://assets-global.website-files.com/658327ffca1812dacb451650/65cbb6d133a678ec605c179f_img-program%402x.webp" // Replace with your image URL
          width={400} // Adjust the width as needed
          height={400} // Adjust the height as needed
          alt="Chat App"
          // className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default LandingPage;
