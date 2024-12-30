import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import UserModel from "@/Models/users.model";
import { addToDB } from "@/helpers/Features/userFeatures";

export async function PATCH(req) {
  await connectDB();

  // Parse the request body
  const body = await req.json();

  // Destructure necessary fields
  const { id, myFriends } = body;

  // Validate input parameters
  if (!id || !myFriends) {
    return NextResponse.json(
      { success: false, msg: "Missing required fields: id and myFriends" },
      { status: 400 }
    );
  }

  try {
    const user = await UserModel.findById(id);

    if (!user) {
      return NextResponse.json(
        { success: false, msg: "User not found" },
        { status: 404 }
      );
    }

    addToDB(user, "myFriends", myFriends);

    await user.save();

    return NextResponse.json(
      {
        success: true,
        data: user,
        msg: "Great! You found New Closed Friend.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error :", error.message);

    return NextResponse.json(
      {
        success: false,
        msg: "Failed to add friend",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
