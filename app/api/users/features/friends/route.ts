import { connectDB } from "@/lib/mongoose";
import UserModel from "@/Models/users.model";
import { NextResponse } from "next/server"; // Replace with the correct path to your User model

export async function POST(req: Request) {
  await connectDB();

  const { userId } = await req.json();

  try {
    // Find the user by their userId and get the `myFriends` field
    const user = await UserModel.findById(userId).select("myFriends");

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          msg: "User not found",
        },
        { status: 404 }
      );
    }

    const friendIds = user.myFriends.map((req: any) => req.userId);

    // Fetch details of all friends using the friend IDs
    const friends = await UserModel.find({ _id: { $in: friendIds } }).sort({
      name: 1,
    });

    return NextResponse.json(
      {
        success: true,
        msg: "Friends fetched successfully",
        data: friends,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        msg: "Failed to get friends",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
