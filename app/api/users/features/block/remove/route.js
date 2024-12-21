import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import UserModel from "@/Models/users.model";
import mongoose from "mongoose";

export async function PATCH(req) {
  await connectDB();

  const body = await req.json();

  const { id, removeFromBlock } = body;

  if (!id || !removeFromBlock) {
    return NextResponse.json(
      {
        success: false,
        msg: "Missing required fields: id and removeFromBlock",
      },
      { status: 400 }
    );
  }

  if (
    !mongoose.Types.ObjectId.isValid(id) ||
    !mongoose.Types.ObjectId.isValid(removeFromBlock)
  ) {
    return NextResponse.json(
      { success: false, msg: "Invalid ObjectId format" },
      { status: 400 }
    );
  }

  try {
    const friendId = new mongoose.Types.ObjectId(removeFromBlock);

    const user = await UserModel.findById(id);
    if (!user) {
      return NextResponse.json(
        { success: false, msg: "User not found" },
        { status: 404 }
      );
    }

    const index = user.blockedUsers.findIndex((friend) =>
      friend.equals(friendId)
    );

    if (index === -1) {
      return NextResponse.json(
        { success: false, msg: "Friend not found in the star list" },
        { status: 404 }
      );
    }

    user.blockedUsers.splice(index, 1);

    if (user.isModified("blockedUsers")) {
      await user.save();
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    console.error("Error :", error.message);

    return NextResponse.json(
      {
        success: false,
        msg: "Failed to remove friend from Block list",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
