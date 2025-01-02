import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import UserModel from "@/Models/users.model";

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get("token")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "No tokens provided" }, { status: 401 });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const { payload } = await jwtVerify(accessToken, secret);

  const user = await UserModel.findById({ _id: payload.userId });

  return NextResponse.json({ success: true, data: user }, { status: 200 });
}
