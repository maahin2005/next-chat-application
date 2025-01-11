import React from "react";
import Image from "next/image"; // Adjust if you're not using Next.js
import { FaCheck, FaTimes } from "react-icons/fa"; // Install with `npm install react-icons`

const friendRequests = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://via.placeholder.com/40",
    time: "2 hours ago",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://via.placeholder.com/40",
    time: "1 day ago",
  },
  {
    id: 3,
    name: "Mike Johnson",
    avatar: "https://via.placeholder.com/40",
    time: "3 days ago",
  },
];

function MyRequests() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">My Friend Requests</h1>
      <div className="space-y-4">
        {friendRequests.map((request) => (
          <div
            key={request.id}
            className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Image
                src={request.avatar}
                alt={`${request.name}'s avatar`}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-gray-800 font-semibold">
                  {request.name}{" "}
                  <span className="text-sm text-gray-500">
                    sent you a friend request
                  </span>
                </p>
                <p className="text-xs text-gray-500">{request.time}</p>
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
        ))}
      </div>
    </div>
  );
}

export default MyRequests;
