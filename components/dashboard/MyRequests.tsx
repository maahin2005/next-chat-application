"use client";

import React, { useEffect, useState } from "react";
import RequestsListUI from "./RequestsListUI";
import { AppDispatch } from "@/lib/store/store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { myIncomingRequests, myOutgoingRequests } from "@/lib/store/features/myRequests/myRequests";

const friendRequests = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    time: "2 hours ago",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    time: "1 day ago",
  },
  {
    id: 3,
    name: "Mike Johnson",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    time: "3 days ago",
  },
];

function MyRequests() {
  const dispatch = useDispatch<AppDispatch>();
  const [incoming,setIncoming] = useState(true)
  const { incomingRequests,outgoingRequests } = useSelector((state: any) => state.myRequests);

  const getRequests = async ()=>{
    try {
      const res = await axios.get("api/users/dashboard/requests");
      dispatch(myIncomingRequests(res?.data?.data?.incoming))
      dispatch(myOutgoingRequests(res?.data?.data?.outgoing))
      console.log(incomingRequests,outgoingRequests)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getRequests();
  },[])

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-4">My Friend Requests</h1>
      <div className="flex">
        <button onClick={()=>setIncoming(true)} className={`p-2 w-1/2 bg-slate-300 text-slate-400 ${incoming?"border-b-4 text-slate-900 border-b-blue-400":""}`}>Incoming</button>
        <button onClick={()=>setIncoming(false)} className={`p-2 w-1/2 bg-slate-300 text-slate-400 ${!incoming?"border-b-4 text-slate-900 border-b-blue-400":""}`}>sent</button>
      </div>
      <div className="space-y-4">
      {incomingRequests?.lentgh > 0 ? incomingRequests?.map((request:any) => (
          <RequestsListUI 
          key={request.id} 
          avatar={request.avatar ?? "https://randomuser.me/api/portraits/men/3.jpg"} 
          name={request.name} 
          time={request.sentAt} 
          username={request.username} 
          incoming={incoming} 
          outgoing={!incoming}
          />
        )):<div className="text-center p-5 text-xl"><h1>No any incoming requests</h1></div>}
        {outgoingRequests?.lentgh > 0 ? outgoingRequests?.map((request:any) => (
          <RequestsListUI 
          key={request.id} 
          avatar={request.avatar ?? "https://randomuser.me/api/portraits/men/3.jpg"} 
          name={request.name} 
          time={request.sentAt} 
          username={request.username} 
          incoming={incoming} 
          outgoing={!incoming}
          />
        )):<div className="text-center p-5 text-xl"><h1>No any sent requests</h1></div>}
      </div>
    </div>
  );
}

export default MyRequests;
