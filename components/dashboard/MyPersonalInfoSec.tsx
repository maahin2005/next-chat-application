import React from "react";
import { TbEdit } from "react-icons/tb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdMailLock } from "react-icons/md";

const MyPersonalInfoSec: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-kanit tracking-wide">Personal Info</h1>
        <Dialog>
          <DialogTrigger>
            <TbEdit className="text-2xl " />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="my-5">
        <h1 className="text-lg font-kanit tracking-wide text-slate-600">
          Verified Credentials
        </h1>

        <div className="flex gap-3 my-2 text-slate-600">
          <MdMailLock className="text-2xl" />
          <p className="tracking-wider font-spaceGro">user.mail@gmail.com</p>
        </div>

        <h1 className="text-lg mt-5 font-kanit tracking-wide text-slate-600">
          Location Info
        </h1>

        <div className="flex gap-3 my-2 text-slate-600">
          <p className="tracking-wider font-spaceGro">Ahmedabad, India</p>
        </div>

        <h1 className="text-lg mt-5 font-kanit tracking-wide text-slate-600">
          My Interests
        </h1>
      </div>
    </div>
  );
};

export default MyPersonalInfoSec;
