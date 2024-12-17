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
    </div>
  );
};

export default MyProfileSec;
