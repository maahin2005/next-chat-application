import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import UserModel from "@/Models/users.model";
import { addToDB, removeFromDB } from "@/helpers/Features/userFeatures";

export async function PATCH(req) {
  await connectDB();

  const body = await req.json();

  const { id, blockedUsers } = body;

  if (!id || !blockedUsers) {
    return NextResponse.json(
      { success: false, msg: "Missing required fields: id and blockedUsers" },
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

    addToDB(user, "blockedUsers", blockedUsers);

    removeFromDB(user, "myFriends", blockedUsers);
    removeFromDB(user, "starFriends", blockedUsers);

    await user.save();

    return NextResponse.json(
      {
        success: true,
        data: user,
        msg: "You are safe Now from this profile",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in Blocking this profile:", error.message);

    return NextResponse.json(
      {
        success: false,
        msg: "Failed to Block this profile",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
