"use client";

import Image from "next/image";
import React from "react";

interface ProfileBasicInfo {
  imageURL?: string;
  name?: string;
  username?: string;
  heading?: string;
}

const MyProfileArea: React.FC<ProfileBasicInfo> = ({
  imageURL,
  name,
  username,
  heading,
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex flex-col sm:flex-row my-5 border-2 gap-5 border-slate-100 p-3 rounded-xl">
      <div>
        <Image
          src={imageURL ?? "https://randomuser.me/api/portraits/women/40.jpg"}
          alt="Profile Image"
          width={100}
          height={100}
          className="rounded-full cursor-pointer m-auto"
          onClick={toggleModal}
        />
      </div>
      <div className="text-center md:text-left">
        <h1 className="text-2xl font-kanit">{name}</h1>
        <p className="text-slate-600 text-lg font-spaceGro my-1">@{username}</p>

        <p className="text-slate-500">{heading ?? "NO heading provided"}</p>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="relative">
            <Image
              src={
                imageURL ?? "https://randomuser.me/api/portraits/women/40.jpg"
              }
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
