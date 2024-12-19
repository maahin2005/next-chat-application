import React from "react";
import { AiOutlineWechatWork } from "react-icons/ai";
import { PiToggleLeftDuotone } from "react-icons/pi";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import Link from "next/link";

const Nav: React.FC = () => {
  return (
    <nav className="flex px-10 h-full">
      <div className="flex justify-between w-full items-center">
        <Link href="/">
          <div className="flex gap-2 text-4xl items-center font-kanit">
            <AiOutlineWechatWork className="" /> <h1>Letschat.io</h1>
          </div>
        </Link>

        <div className="flex gap-3 text-slate-700 items-center">
        <Link href="/letschat">
           <h1 className="text-xl font-kanit text-blue-900 underline hover:no-underline">Letschat</h1>
          
        </Link>
          <IoNotificationsCircleSharp className="text-4xl" />
          <PiToggleLeftDuotone className="text-4xl" />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
