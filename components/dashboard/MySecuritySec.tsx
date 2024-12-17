import React from "react";
import { FaRegEye,FaKey } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";


const MySecuritySec: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-kanit tracking-wide">Security</h1>
      <div className="my-4 mt-5 flex justify-between items-center font-semibold w-full border-2 border-gray-100 p-4 rounded-lg">
  <div className="flex items-center gap-3">
    <FaRegEye className="text-blue-600 text-xl" />
    <div>
      <p className="text-gray-800 tracking-wide">Profile Visibility</p>
      <span className="text-sm text-blue-900 underline">
        PUBLIC
      </span>
    </div>
  </div>
  <TbEdit className="text-2xl cursor-pointer text-blue-900  transition" />
</div>
<div className="my-4 mt-5 flex justify-between items-center font-semibold w-full bg-gray-100 p-4 rounded-lg shadow-md">
  <div className="flex items-center gap-3">
    <FaKey className="text-blue-600 text-xl" />
    <div>
      <p className="text-gray-800 tracking-wide">Change Password</p>
      <span className="underline text-sm text-blue-900">UPDATE YOUR ACCOUNT PASSWORD</span>
    </div>
  </div>
      <TbEdit className="text-2xl cursor-pointer text-blue-900  transition" />
 
</div>



    </div>
  );
};

export default MySecuritySec;
