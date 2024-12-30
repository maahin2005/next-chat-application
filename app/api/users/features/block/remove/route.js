import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import UserModel from "@/Models/users.model";
import mongoose from "mongoose";

export async function PATCH(req) {
  // Connect to the database
  await connectDB();

  try {
    const body = await req.json();
    const { id, removeFromBlock } = body;

    // Validate request data
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

    // Fetch the user by ID
    const user = await UserModel.findById(id);
    if (!user) {
      return NextResponse.json(
        { success: false, msg: "User not found" },
        { status: 404 }
      );
    }

    // Check if the friend exists in the blockedUsers list
    const blockedIndex = user.blockedUsers.findIndex(
      (blocked) => blocked.userId === removeFromBlock
    );

    if (blockedIndex === -1) {
      return NextResponse.json(
        { success: false, msg: "User not found in the block list" },
        { status: 404 }
      );
    }

    // Remove the user from the blockedUsers list
    user.blockedUsers.splice(blockedIndex, 1);

    // Save the updated user document
    await user.save();

    return NextResponse.json(
      { success: true, msg: "User removed from block list", data: user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error.message);

    return NextResponse.json(
      {
        success: false,
        msg: "Failed to remove user from block list",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
