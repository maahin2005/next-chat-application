import React from "react";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

const DashboardSection: React.FC = () => {
  return (
    <div className="flex h-full">
      <div className="hidden md:inline-block md:w-[30%] lg:w-[25%] md:px-5 lg:px-10 h-[95%]">
        <LeftSection />
      </div>
      <div className="w-[90%] m-auto md:w-[70%] lg:w-[75%] py-2 px-5 md:px-5  lg:px-10 h-fit md:h-full bg-gray-100 rounded-2xl">
        <RightSection />
      </div>
    </div>
  );
};

export default DashboardSection;
