import { connectDB } from "@/lib/mongoose";
import UserModel from "@/Models/users.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();

  const { userId } = await req.json();

  try {
    const user = await UserModel.findById({ _id: userId }).select(
      "sentFriendReq"
    );

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          msg: "User not found",
        },
        { status: 404 }
      );
    }

    const friendIds = user.sentFriendReq.map((req: any) => req.userId);

    const friends = await UserModel.find({
      _id: { $in: friendIds },
    })
      .select("name email")
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
    return NextResponse.json(
      {
        success: false,
        msg: "Failed to get Data",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
