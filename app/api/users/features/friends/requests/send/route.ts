import { connectDB } from "@/lib/mongoose";
import UserModel from "@/Models/users.model";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  await connectDB();

  const { sentBy, sentTo } = await req.json();

  if (!sentBy || !sentTo) {
    return NextResponse.json(
      { success: false, msg: "Missing required fields: sentBy and sentTo" },
      { status: 400 }
    );
  }

  try {
    const sentByUser = await UserModel.findById({ _id: sentBy });
    const sentToUser = await UserModel.findById({ _id: sentTo });

    if (!sentByUser) {
      return NextResponse.json(
        {
          success: false,
          msg: "I think Ghost is there! sent by user not found",
        },
        { status: 404 }
      );
    }

    if (!sentToUser) {
      return NextResponse.json(
        {
          success: false,
          msg: "This user not found",
        },
        { status: 404 }
      );
    }

    sentByUser.sentFriendReq.push({ userId: sentTo });
    sentToUser.incomingFriendReq.push({ userId: sentBy });

    await sentByUser.save();
    await sentToUser.save();

    return NextResponse.json(
      {
        success: true,
        msg: `Friend Request send successfully! lets wait for ${sentToUser.name}. They want to add you or not.`,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        msg: "Failed to send friend request",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
