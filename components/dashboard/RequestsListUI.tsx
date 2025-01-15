import Image from 'next/image';
import React from 'react';
import { FaCheck, FaTimes } from "react-icons/fa"; 


interface RequestList {
    avatar?:string | null;
    name?:string | null;
    time?:string | null;
    incoming?:boolean | null;
    outgoing?:boolean | null;
    username?:string | null;
}

const  RequestsListUI:React.FC<RequestList>=({avatar,name,time,username,incoming=true,outgoing=false}) =>{
  return (
    <div
            
            className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Image
                src={avatar ?? ""}
                alt={`${name}'s avatar`}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-gray-800 font-semibold">
                  {name}{" "}
                  <span className="text-sm text-gray-500">
                    sent you a friend request
                  </span>
                </p>
                <p className="text-xs text-gray-500">{time}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 text-sm bg-green-600 text-white py-1 px-3 rounded-md hover:bg-green-700 transition">
                <FaCheck className="text-white" />
                Accept
              </button>
              <button className="flex items-center gap-2 text-sm bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 transition">
                <FaTimes className="text-white" />
                Reject
              </button>
            </div>
          </div>
  )
}

export default RequestsListUI