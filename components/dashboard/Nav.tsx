import React from "react";
import { AiOutlineWechatWork } from "react-icons/ai";
import { PiToggleLeftDuotone } from "react-icons/pi";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiMenu3Line } from "react-icons/ri";

const Nav: React.FC = () => {
  return (
    <nav className="flex px-3 sm:px-10 h-full">
      <div className="flex justify-between w-full items-center">
        <Link href="/">
          <div className="flex gap-2 text-lg sm:text-4xl items-center font-kanit">
            <AiOutlineWechatWork className="" /> <h1>Letschat.io</h1>
          </div>
        </Link>

        <div className="hidden md:flex gap-3 text-slate-700 items-center">
          <Link href="/letschat">
            <h1 className="md:text-xl font-kanit text-blue-900 underline hover:no-underline">
              Letschat
            </h1>
          </Link>
          <IoNotificationsCircleSharp className="text-4xl" />
          <PiToggleLeftDuotone className="text-4xl" />
        </div>
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <RiMenu3Line className="text-3xl" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="md:hidden">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/letschat">
                  <h1 className="text-xl font-kanit text-blue-900 underline hover:no-underline">
                    Letschat
                  </h1>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IoNotificationsCircleSharp className="text-4xl" />
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PiToggleLeftDuotone className="text-4xl" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
