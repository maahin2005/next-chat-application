import Image from 'next/image';
import React from 'react'

interface UserCardData {
    data: {
        img: string;
        name: string;
        lastMsg: string;
        lastTime: string;
      };
}

const UserCard:React.FC<UserCardData>=({data}:any)=> {
  return (
    <div className="relative h-[300px] w-[270px] rounded-lg shadow-md my-3 p-2 text-center flex flex-col">
         <div>
                  <Image
                    src={data.img}
                    alt={data.name}
                    width={50}
                    height={50}
                    className="w-24 h-24 rounded-lg object-cover m-auto"
                  />
                </div>
                <div className="mt-5">
                    <h1 className="text-[#202020] text-lg font-semibold">{data.name}</h1>
                    <p className="font-semibold lg:text-sm mt-2 text-[#6418C3]">Heading of someone</p>
                    <p className="text-slate-500 lg:text-sm line-clamp-2 overflow-hidden h-[42px] mb-2">{data.lastMsg}</p>


                </div>
                <div className=' absolute bottom-1 w-[95%] my-3'>
                    <button className="bg-[#6418C3] w-full text-white font-semibold p-2 text-sm font-spaceGro rounded-lg">
                        Make Friend
                        </button>
                </div>
    </div>
  )
}

export default UserCard