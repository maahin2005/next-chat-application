"use client";

import React, { useEffect } from "react";
import { TbEdit } from "react-icons/tb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MyProfileArea from "./MyProfileArea";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/store/store";
import ProfileSkeleton from "./../loading/skeletons/ProfileSkeleton";
import {
  requestFullfilled,
  requestIntiated,
  requestRejected,
} from "@/lib/store/features/loading/loadingSlice";
import { addMyProfileData } from "@/lib/store/features/myProfile/myProfileSlice";

const MyProfileSec: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: any) => state.loadHandler);
  const { profileImage, username, name, bio, heading } = useSelector(
    (state: any) => state.myProfile
  );

  const [profileData, setProfileData] = React.useState({
    profileImage: "",
    username: "",
    name: "",
    bio: "",
    heading: "",
  });

  const fetchUserData = async () => {
    if (profileImage || username || name || bio || heading) {
      return;
    }
    dispatch(requestIntiated());
    try {
      const resp = await axios.get("api/users/dashboard/profile");
      // setProfileData();
      dispatch(addMyProfileData(resp?.data?.data));
      dispatch(requestFullfilled());
    } catch (error) {
      console.log("Error: ", error);
      dispatch(requestRejected());
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-kanit tracking-wide">My Profile</h1>
        <Dialog>
          <DialogTrigger>
            <TbEdit className="text-2xl " />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      {loading ? (
        <ProfileSkeleton />
      ) : (
        <MyProfileArea
          imageURL={profileImage}
          name={name}
          username={username}
          heading={heading}
        />
      )}
      <div className="border-e-2 border-b-2 border-slate-100 p-3 rounded-xl">
        <h1 className="text-2xl font-kanit">BIO</h1>
        <p className="text-slate-600 text-lg font-spaceGro py-1">
          {bio ?? "so boring...You have not added your bio yet!"}
        </p>
      </div>
    </div>
  );
};

export default MyProfileSec;
