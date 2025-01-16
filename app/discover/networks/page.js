"use client";
import MainContent from "@/components/homepage/MainContent";
import HomePageNav from "@/components/homepage/Navbar";
import SearchFriends from "@/components/homepage/SearchFriends";
import { useAppSelector } from "@/lib/store/hooks";
import React from "react";

function Homepage() {
  // const { username, mobileNo, city } = useAppSelector((state) => state.user);
  return (
    <div className="md:h-screen text-blue-950 ">
      <div>
        <HomePageNav />
      </div>
      <div className="my-5 mb-5 md:mt-18">
        <SearchFriends />
      </div>
      <div
        className="max-h-[500px] overflow-y-auto"
        style={{ scrollbarWidth: "none" }}
      >
        <MainContent />
      </div>
    </div>
  );
}

export default Homepage;
// bg-gradient-to-br from-[#93A5CF] to-[#E4EfE9]
