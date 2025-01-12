import { connectDB } from "@/lib/mongoose";
import UserModel from "@/Models/users.model";
import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "@/utils/decodeToken";

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const accessToken = req.cookies.get("token")?.value;
    
    if (!accessToken) {
      return NextResponse.json(
        { error: "No tokens provided" },
        { status: 401 }
      );
    }

    const decoded = await decodeToken(accessToken);
    
    const user = await UserModel.findById({ _id: decoded.userId }).select(
      "name username profileImage heading bio"
    );

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        msg: `Oops! Fail to get user profile data`,
      },
      { status: 500 }
    );
  }
}
