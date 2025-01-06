import React from "react";
import { AiOutlineWechatWork } from "react-icons/ai";

function AuthNav() {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-center px-4 md:px-8">
        <div className="flex items-center gap-2 text-2xl font-semibold text-gray-800 font-kanit">
          <AiOutlineWechatWork className="text-blue-600" />
          <h1>LetsChat.io</h1>
        </div>
      </div>
    </header>
  );
}

export default AuthNav;
