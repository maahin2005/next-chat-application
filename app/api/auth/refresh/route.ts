import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"; // For generating the JWT token

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { error: "No refresh token provided" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);

    const newAccessToken = jwt.sign(decoded, process.env.JWT_SECRET!, {
      expiresIn: "15m",
    });

    const response = NextResponse.json({ success: true });
    response.cookies.set("token", newAccessToken, {
      httpOnly: true,
      path: "/",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: "Invalid refresh token", success: false, msg: error.message },
      { status: 403 }
    );
  }
}
