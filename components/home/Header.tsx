import Image from "next/image";
import React from "react";
import headerImg from "@/resources/Images/Home/HeaderImg.svg";

const LandingPage: React.FC = () => {
  return (
    <div className="w-full min-h-[80vh] flex justify-center items-center my-3">
      <div className="flex flex-col md:flex-row justify-between gap-10 items-center w-full md:w-4/5 m-auto">
        <div className="w-4/5 m-auto md:w-1/2">
          <h1 className="text-3xl lg:text-5xl text-gray-800 mb-4 font-kanit font-medium tracking-wide">
            Start chatting with anyone, anytime, <br />
            with Lets Chat
          </h1>
          <p className="text-base lg:text-lg text-gray-500 mb-5 tracking-wide">
            Great software that allows you to chat from any place at any time
            without any interruption.
          </p>
          <button className="px-6 py-3 bg-contractColor-light text-white rounded-lg hover:bg-contractColor-dark">
            Start Chatting Now
          </button>
        </div>
        <div className="w-full md:w-1/2">
          <Image
            src={headerImg} // Replace with your image URL
            width={500} // Adjust the width as needed
            height={500} // Adjust the height as needed
            alt="Chat App"
            className="m-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
