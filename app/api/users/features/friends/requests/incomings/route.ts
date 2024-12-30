import { connectDB } from "@/lib/mongoose";
import UserModel from "@/Models/users.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Connect to the database
  await connectDB();

  try {
    // Parse the request body
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          msg: "Missing required field: userId",
        },
        { status: 400 }
      );
    }

    // Find the user by ID and select incomingFriendReq
    const user = await UserModel.findById(userId).select("incomingFriendReq");

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          msg: "User not found",
        },
        { status: 404 }
      );
    }

    // Extract friend IDs from incomingFriendReq
    const friendIds = user.incomingFriendReq.map((req: any) => req.userId);

    if (friendIds.length === 0) {
      return NextResponse.json(
        {
          success: true,
          msg: "No incoming friend requests",
          data: [],
        },
        { status: 200 }
      );
    }

    // Fetch details of all friends using the friend IDs
    const friends = await UserModel.find({
      _id: { $in: friendIds },
    })
      .select("name email") // Adjust fields as needed
      .sort({ name: 1 });

    return NextResponse.json(
      {
        success: true,
        msg: "Friends fetched successfully",
        data: friends,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error:", error.message);

    return NextResponse.json(
      {
        success: false,
        msg: "Failed to get data",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
