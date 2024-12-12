import React from "react";
import inboxImg from "@/resources/Images/Home/inbox.svg";
import Image from "next/image";

const CustomerHub: React.FC = () => {
  return (
    <div className="bg-[#F8F8FA] min-h-[500px] flex items-center h-fit py-2">
      <div className="w-[90%] m-auto flex-col md:flex-row flex h-full items-center gap-10 md:gap-[10%]">
        <div className="w-full md:w-[50%] lg:w-[40%] ">
          <Image
            src={inboxImg}
            alt="Inbox Image"
            className="w-full sm:w-3/4 md:w-full lg:w-4/5 m-auto "
          />
        </div>
        <div className="h-full w-full md:w-3/4 lg:w-1/2">
          <h1 className="font-semibold text-4xl md:text-3xl lg:text-4xl">
            Get direct contacts <br /> with your friends & family
          </h1>
          <p className="my-5 text-[#383A47]">
            Lorem ipsum Lorem ipsum dolor sit amet consectetur, adipisicing
            elit. Vero quo repellat mollitia, voluptatibus labore atque
            obcaecati porro eos fugit eaque eveniet perferendis excepturi eum
            molestias aspernatur omnis laborum iusto aliquam!
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerHub;
