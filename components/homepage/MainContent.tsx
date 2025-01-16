"use client";

import React, { useEffect } from "react";
import { data } from "@/utils/letschat/contactChatList";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/store/store";
import axios from "axios";
import { addMyNetworks } from "@/lib/store/features/networks/networks";

const MainContent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { myNetworks } = useSelector((state: any) => state.myNetworks);

  const getMyNetworks = async () => {
    console.log("getMyNetworks==> inside ");
    try {
      const res = await axios.get("/api/users/discover/networks");

      console.log(res.data.data);
      dispatch(addMyNetworks(res.data.data));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getMyNetworks();
  }, []);
  return (
    <div className="w-4/5 m-auto my-3">
      <div className="grid grid-cols-4 justify-between items-center">
        {myNetworks?.map((el: any) => (
          <UserCard key={el.id} data={el} />
        ))}
      </div>
    </div>
  );
};

export default MainContent;
