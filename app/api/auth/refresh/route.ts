import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"; // For generating the JWT token
import { decodeToken } from "@/utils/decodeToken";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }

  try {
    // const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    const decoded = await decodeToken(token);

    const newAccessToken = jwt.sign(decoded, process.env.JWT_SECRET!, {
      expiresIn: "24h",
    });

    const response = NextResponse.json({ success: true });
    response.cookies.set("token", newAccessToken, {
      httpOnly: true,
      path: "/",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: "Invalid token", success: false, msg: error.message },
      { status: 403 }
    );
  }
}
