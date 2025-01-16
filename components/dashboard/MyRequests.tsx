"use client";

import React, { useEffect, useState } from "react";
import RequestsListUI from "./RequestsListUI";
import { AppDispatch } from "@/lib/store/store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  myIncomingRequests,
  myOutgoingRequests,
} from "@/lib/store/features/myRequests/myRequests";

function MyRequests() {
  const dispatch = useDispatch<AppDispatch>();
  const [incoming, setIncoming] = useState(true);
  const { incomingRequests, outgoingRequests } = useSelector(
    (state: any) => state.myRequests
  );

  const getRequests = async () => {
    try {
      const res = await axios.get("api/users/dashboard/requests");
      dispatch(myIncomingRequests(res?.data?.data?.incoming || []));
      dispatch(myOutgoingRequests(res?.data?.data?.outgoing || []));
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    getRequests();
  }, [incoming]); // Ensure this dependency is necessary; it will refetch requests when `incoming` changes.

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-4">My Friend Requests</h1>
      <div className="flex">
        <button
          onClick={() => setIncoming(true)}
          className={`p-2 w-1/2 bg-slate-300 text-slate-400 ${
            incoming ? "border-b-4 text-slate-900 border-b-blue-400" : ""
          }`}
        >
          Incoming
        </button>
        <button
          onClick={() => setIncoming(false)}
          className={`p-2 w-1/2 bg-slate-300 text-slate-400 ${
            !incoming ? "border-b-4 text-slate-900 border-b-blue-400" : ""
          }`}
        >
          Sent
        </button>
      </div>
      <div className="space-y-4">
        {incoming ? (
          incomingRequests?.length > 0 ? (
            incomingRequests.map((request: any) => (
              <RequestsListUI
                key={request.id}
                avatar={
                  request.avatar ??
                  "https://randomuser.me/api/portraits/men/3.jpg"
                }
                name={request.name}
                time={request.sentAt}
                username={request.username}
                incoming
              />
            ))
          ) : (
            <div className="text-center p-5 text-xl">
              <h1>No incoming requests</h1>
            </div>
          )
        ) : outgoingRequests?.length > 0 ? (
          outgoingRequests.map((request: any) => (
            <RequestsListUI
              key={request.id}
              avatar={
                request.avatar ??
                "https://randomuser.me/api/portraits/men/3.jpg"
              }
              name={request.name}
              time={request.sentAt}
              username={request.username}
              outgoing
            />
          ))
        ) : (
          <div className="text-center p-5 text-xl">
            <h1>No sent requests</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyRequests;
