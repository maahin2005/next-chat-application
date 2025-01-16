import { connectDB } from "@/lib/mongoose";
import UserModel from "@/Models/users.model";
import { decodeToken } from "@/utils/decodeToken";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  await connectDB();

  try {
    const accessToken = req.cookies.get("token")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { success: false, message: "No token provided" },
        { status: 401 }
      );
    }

    const decoded = await decodeToken(accessToken);

    if (!decoded?.userId) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    const user = await UserModel.find({ _id: decoded.userId });
    // const networks = await UserModel.find({})

    const blockedUsers = user?.blockedUsers || [];
    const friends = user.myFriends || []; // Assuming `friends` array exists
    const notInterested = (user.notInterestedRecommendations || []).map(
      (rec) => rec.userId
    );

    const excludedUsers = [
      decoded.userId,
      ...blockedUsers,
      ...friends,
      ...notInterested,
    ];

    const networks = await UserModel.find({
      _id: { $nin: excludedUsers },
    }).lean();

    return NextResponse.json(
      {
        data: networks,
        success: true,
        msg: "Networks data fetch successully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        success: false,
        msg: "Error while fetching networks",
      },
      { status: 500 }
    );
  }
};
