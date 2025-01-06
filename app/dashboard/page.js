import DashboardSection from "@/components/dashboard/DashboardSection";
import Nav from "@/components/dashboard/Nav";
import React from "react";

async function page() {
  return (
    <>
      <div className="h-fit md:min-h-[600px] md:h-screen flex flex-col">
        <div className="h-16">
          <Nav />
        </div>
        <div className="flex-1 overflow-auto">
          <DashboardSection />
        </div>
      </div>
    </>
  );
}

export default page;
