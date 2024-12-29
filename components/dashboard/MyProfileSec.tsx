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
import MyProfileArea from "./MyProfileArea";

const MyProfileSec: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-kanit tracking-wide">My Profile</h1>
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
      <MyProfileArea />
      <div className="border-e-2 border-b-2 border-slate-100 p-3 rounded-xl">
        <h1 className="text-2xl font-kanit">BIO</h1>
        <p className="text-slate-600 text-lg font-spaceGro py-1">
          Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet,
          consectetur Lorem ipsum dolor sit amet, consectetur
        </p>
      </div>
    </div>
  );
};

export default MyProfileSec;
