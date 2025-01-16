import Image from "next/image";
import React from "react";
import { FaBell, FaRegEnvelope, FaBellSlash } from "react-icons/fa";

const MyNotificationsSec: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-kanit mb-5">Notifications</h2>
      <p className="text-gray-700 text-sm mb-4">
        Stay updated with the latest activities and messages from your friends.
      </p>

      <div className="my-4 mt-5 bg-gray-100 p-6 rounded-lg shadow-md w-full">
        <div className="flex flex-col gap-4">
          {/* Example Notification */}
          <div className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm">
            <div className="flex items-center gap-3">
              <Image
                src="https://via.placeholder.com/40"
                alt="User Avatar"
                width={10}
                height={10}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-gray-800 font-semibold">
                  John Doe{" "}
                  <span className="text-sm text-gray-500">
                    sent you a friend request
                  </span>
                </p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <button className="text-sm bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700 transition">
              View
            </button>
          </div>

          {/* Another Notification */}
          <div className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm">
            <div className="flex items-center gap-3">
              <Image
                src="https://via.placeholder.com/40"
                alt="User Avatar"
                width={10}
                height={10}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-gray-800 font-semibold">
                  Jane Smith{" "}
                  <span className="text-sm text-gray-500">
                    commented on your post
                  </span>
                </p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
            <button className="text-sm bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700 transition">
              View
            </button>
          </div>

          {/* Another Notification */}
          <div className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm">
            <div className="flex items-center gap-3">
              <Image
                src="https://via.placeholder.com/40"
                alt="User Avatar"
                width={10}
                height={10}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-gray-800 font-semibold">
                  Mark Lee{" "}
                  <span className="text-sm text-gray-500">
                    liked your photo
                  </span>
                </p>
                <p className="text-xs text-gray-500">3 days ago</p>
              </div>
            </div>
            <button className="text-sm bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700 transition">
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyNotificationsSec;
