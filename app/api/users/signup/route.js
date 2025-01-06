import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import UserModel from "@/Models/users.model";
import jwt from "jsonwebtoken"; // For generating the JWT token

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
      gender
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
      gender
    });

    const userData = {
      userId: data._id,
      username: data.username,
      role: data.role,
      name: data.name,
    };

    const token = jwt.sign(userData, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const response = NextResponse.json(
      { success: true, data: data, msg: "Hey! Welcome to Letschat." },
      { status: 201 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error(error.message);
    return NextResponse.json(
      { success: false, msg: "Failed to Signup", error: error.message },
      { status: 500 }
    );
  }
}
