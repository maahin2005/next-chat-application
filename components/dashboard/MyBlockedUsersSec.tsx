import React from 'react'

const MyBlockedUsersSec:React.FC=()=> {
  return (
    <div>
  <h2  className="text-2xl font-kanit mb-5">Blocked Users</h2>
  <p className="text-gray-700 text-sm mb-4">
    View and manage the users you've blocked. Unblock them anytime to resume conversations.
  </p>
        <div className="my-4 mt-5 border-2 border-gray-100 p-6 rounded-lg w-full ">
  <div className="flex flex-col gap-4">

    <div className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm">
      <div className="flex items-center gap-3">
        <img
          src="https://via.placeholder.com/40"
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
        <p className="text-gray-800 font-semibold">John Doe</p>
      </div>
      <button className="text-sm bg-red-300 text-white py-1 px-3 rounded-md hover:bg-red-600 transition">
        Unblock
      </button>
    </div>

  </div>
</div>
    </div>
  )
}

export default MyBlockedUsersSec