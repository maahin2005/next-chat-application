import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import UserModel from "@/Models/users.model";
import { decodeToken } from "@/utils/decodeToken";

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get("token")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "No tokens provided" }, { status: 401 });
  }

  const decoded = await decodeToken(accessToken);

  const user = await UserModel.findById({ _id: decoded.userId });

  return NextResponse.json({ success: true, data: user }, { status: 200 });
}
