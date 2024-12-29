import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import UserModel from "@/Models/users.model";

// simple first
export async function POST(req) {
  try {
    await connectDB();
    const {
      username,
      password,
      profileImage,
      email,
      name,
      mobileNo,
      profileVisibility,
      heading,
      bio,
      city,
      country,
      pincode,
      starFriends,
      blockedUsers,
      interests,
      myFriends,
      notInterestedRecommendations,
      role,
      incomingFriendReq,
      sentFriendReq,
    } = await req.json();

    const data = await UserModel.create({
      username,
      password,
      email,
      profileImage,
      name,
      mobileNo,
      profileVisibility,
      heading,
      bio,
      city,
      country,
      pincode,
      starFriends,
      blockedUsers,
      interests,
      myFriends,
      notInterestedRecommendations,
      role,
      incomingFriendReq,
      sentFriendReq,
    });
    return NextResponse.json(
      { success: true, data: data, msg: "Hey! Welcome to Letschat." },
      { status: 201 }
    );
  } catch (error) {
    console.error(error.message);
    return NextResponse.json(
      { success: false, msg: "Failed to Signup", error: error.message },
      { status: 500 }
    );
  }
}
