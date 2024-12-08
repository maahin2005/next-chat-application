import React from "react";
import videoGirlImg from "@/resources/Images/Home/videoGirl.svg";
import BgBlackSVg from "@/resources/Images/Home/bgBlackCall.svg";
import flipCamera from "@/resources/Images/Home/flipCamera.svg";
import camera from "@/resources/Images/Home/camera.svg";
import endCall from "@/resources/Images/Home/endCall.svg";
import mic from "@/resources/Images/Home/mic.svg";
import reactions from "@/resources/Images/Home/reactions.svg";

import Image from "next/image";

const Upcoming: React.FC = () => {
  const videoCallIcons = [flipCamera, camera, endCall, mic, reactions];

  return (
    <div className="bg-[#F8F8FA] min-h-[400px] w-full flex items-center ">
      <div className="md:3/4 w-full lg:w-5/6 m-auto flex flex-wrap md:gap-[8%] justify-center lg:gap-[12%] h-full items-center py-5">
        <div className="relative md:w-[40%] w-[90%] sm:w-[60%] lg:w-[40%] lg:max-w-[500px] h-[300px]">
          <Image
            src={videoGirlImg}
            width={450}
            height={300}
            alt="Upcoming"
            className="rounded-t-lg w-full h-full object-cover"
          />
          <div className="absolute bottom-0 z-10">
            <Image
              src={BgBlackSVg}
              width={400}
              height={100}
              alt="Black Overlay"
              className="w-full"
            />
          </div>
          <div className="absolute flex items-center bottom-0 z-20 w-full h-[80px] m-auto px-12">
            {videoCallIcons.map((el, i): any => (
              <div className="m-auto">
                <Image
                  src={el}
                  key={i}
                  width={45}
                  height={45}
                  alt="Black Overlay"
                  className="w-[95%]"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="min-h-[250px] md:w-[40%] lg:w-[45%] w-[90%] sm:w-[60%] mt-10 md:mt-0">
          <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold mb-5">
            Meet your friends, <br /> with live video chat
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adip amet, consectetur adip
          </p>

          <p className="my-5">
            Lorem ipsum dolor sit amet, consectetur adip amet, consectetur adip
          </p>
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
