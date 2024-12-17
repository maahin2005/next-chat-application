"use client";

import Image from "next/image";
import React from "react";

const MyProfileArea: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex my-5 border-2 gap-5 border-slate-100 p-3 rounded-xl">
      <div>
        <Image
          src={"https://randomuser.me/api/portraits/women/40.jpg"}
          alt="Profile Image"
          width={100}
          height={100}
          className="rounded-full cursor-pointer"
          onClick={toggleModal}
        />
      </div>
      <div className="">
        <h1 className="text-2xl font-kanit">User Name</h1>
        <p className="text-slate-600 text-lg font-spaceGro my-1">@username</p>

        <p className="text-slate-500">Heading of somone</p>
      </div>
       {/* Modal */}
       {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="relative">
            <Image
              src={"https://randomuser.me/api/portraits/women/40.jpg"}
              alt="Profile Image"
              width={400}
              height={400}
              className="rounded-full"
            />
            <button
              className="absolute top-3 right-3 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-bold"
              onClick={toggleModal}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfileArea;
