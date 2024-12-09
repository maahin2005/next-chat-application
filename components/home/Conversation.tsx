import Image from "next/image";
import React from "react";
import Image1 from "@/resources/Images/Home/cImage1.svg";
import Image2 from "@/resources/Images/Home/cImage2.svg";
import Image3 from "@/resources/Images/Home/cImage3.svg";
import { Button } from "../ui/button";

const Conversation: React.FC = () => {
  return (
    <div className="flex items-center w-full min-h-[400px] h-fit py-10">
      <div className="w-4/5 h-full grid md:flex m-auto items-center justify-between">
        <div className="h-full w-full">
          <h1 className="text-5xl md:text-4xl lg:text-5xl font-bold">
            Start selling directly <br /> inside conversation
          </h1>
          <p className="my-8 md:w-3/4">
            lorem ipsum dolor sit amet, consectetur adip Lorem ipsum dolor, sit
            amet consectetur adipisicing elit. Quis autem animi reprehenderit
            officia? Incidunt, facere.
          </p>
          {/* <button className="min-w-36 p-3 font-semibold bg-[#FB8E0B] text-white rounded-md">
            Start Chatting Now
          </button> */}
          <Button className="font-semibold bg-contractColor-light p-4 py-5 hover:bg-contractColor-dark">
            Start Chatting Now
          </Button>
        </div>
        <div className="h-full w-full">
          <div className="relative h-[400px]">
            {/* Main Image */}
            <Image src={Image1} alt="Image 1" className="w-[400px] m-auto" />

            {/* Overlay Image */}
            <div className="absolute bottom-[-120px] left-[-50px]">
              <Image src={Image2} alt="Image 2" className="" />
            </div>

            <div className="absolute bottom-0 right-[-10%] sm:right-[-5%] md:right-[-20%] lg:right-0">
              <Image src={Image3} alt="Image 3" className="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
