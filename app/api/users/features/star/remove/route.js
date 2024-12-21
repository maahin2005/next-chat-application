import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import UserModel from "@/Models/users.model";
import mongoose from "mongoose";

export async function PATCH(req) {
  await connectDB();

  // Parse the request body
  const body = await req.json();

  // Destructure necessary fields
  const { id, removeFromStar } = body;

  // Validate input parameters
  if (!id || !removeFromStar) {
    return NextResponse.json(
      {
        success: false,
        msg: "Missing required fields: id and removeFromStar",
      },
      { status: 400 }
    );
  }

  // Ensure 'id' and 'removeFromStar' are valid ObjectIds
  if (
    !mongoose.Types.ObjectId.isValid(id) ||
    !mongoose.Types.ObjectId.isValid(removeFromStar)
  ) {
    return NextResponse.json(
      { success: false, msg: "Invalid ObjectId format" },
      { status: 400 }
    );
  }

  try {
    // Convert string to ObjectId
    const friendId = new mongoose.Types.ObjectId(removeFromStar);

    // Find the user by id
    const user = await UserModel.findById(id);
    if (!user) {
      return NextResponse.json(
        { success: false, msg: "User not found" },
        { status: 404 }
      );
    }

    // Find the index of the friend in the starFriends array
    const updatedStarFriends = user.starFriends.filter(
      (friend) => !friend.equals(friendId)
    );

    // If the length of the filtered array is the same, friend was not found
    if (updatedStarFriends.length === user.starFriends.length) {
      return NextResponse.json(
        { success: false, msg: "Friend not found in the star list" },
        { status: 404 }
      );
    }

    // Update the starFriends array with the filtered list
    user.starFriends = updatedStarFriends;

    // Save only if the starFriends array has changed
    if (user.isModified("starFriends")) {
      await user.save();
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    // Log error details for debugging, but keep it safe in production
    console.error("Error in PATCH /removeFriendFromStar:", error.message);

    return NextResponse.json(
      {
        success: false,
        msg: "Failed to remove friend from star list",
        error:
          process.env.NODE_ENV === "production"
            ? "Internal server error"
            : error.message,
      },
      { status: 500 }
    );
  }
}
