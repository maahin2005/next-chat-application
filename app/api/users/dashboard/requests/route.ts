import { connectDB } from "@/lib/mongoose";
import UserModel from "@/Models/users.model";
import { decodeToken } from "@/utils/decodeToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
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

    const user = await UserModel.findById(decoded.userId).select(
      "incomingFriendReq sentFriendReq"
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Extract IDs for incoming and outgoing requests
    const incomingIds = user.incomingFriendReq.map((req: any) => req.userId);
    const outgoingIds = user.sentFriendReq.map((req: any) => req.userId);

    // Fetch user details in batches
    const incomingUsers = await UserModel.find({
      _id: { $in: incomingIds },
    }).select("name username");
    const outgoingUsers = await UserModel.find({
      _id: { $in: outgoingIds },
    }).select("name username");

    // Map requests to user details
    const incoming = user.incomingFriendReq.map((req: any) => {
      const user = incomingUsers.find(
        (u: any) => u._id.toString() === req.userId.toString()
      );
      return {
        id: req.userId,
        name: user?.name || "Unknown",
        username: user?.username || "Unknown",
        receivedAt: req.receivedAt,
      };
    });

    const outgoing = user.sentFriendReq.map((req: any) => {
      const user = outgoingUsers.find(
        (u: any) => u._id.toString() === req.userId.toString()
      );
      return {
        id: req.userId,
        name: user?.name || "Unknown",
        username: user?.username || "Unknown",
        sentAt: req.sentAt,
      };
    });

    // Return simplified, frontend-friendly response
    return NextResponse.json(
      { success: true, data: { incoming, outgoing } },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching friend requests:", error.message);

    return NextResponse.json(
      {
        success: false,
        message: "Error while fetching data",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
