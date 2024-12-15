import DashboardSection from "@/components/dashboard/DashboardSection";
import Nav from "@/components/dashboard/Nav";
import React from "react";

function page() {
  return (
    <div className="min-h-screen h-fit md:h-screen flex flex-col">
      <div className="h-16">
        <Nav />
      </div>
      <div className="flex-1 overflow-auto">
        <DashboardSection />
      </div>
    </div>
  );
}

export default page;
