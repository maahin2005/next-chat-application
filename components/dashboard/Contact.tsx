import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Contacts {
  data: {
    img: string;
    name: string;
    lastMsg: string;
    lastTime: string;
  };
}
const Contact: React.FC<Contacts> = ({ data }: any) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <div className="flex justify-between w-[95%] p-2 my-2 h-fit border-l-2 rounded-md hover:shadow-lg border-b-2 border-slate-200 min-h-12 items-center  text-gray-500">
          <div className="flex md:gap-5 items-center">
            <div>
              <Image
                src={data.img}
                alt={data.name}
                width={50}
                height={50}
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>

            <h1>{data.name}</h1>
          </div>
          <div className="justify-self-end">
            <p className="text-slate-500 md:text-xs lg:text-sm">
              {data.lastTime}
            </p>
          </div>
        </div>
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
  );
};

export default Contact;
