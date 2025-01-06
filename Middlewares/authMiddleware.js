import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function authMiddleware(request) {
  const accessToken = request.cookies.get("token");

  if (!accessToken) {
    return NextResponse.json(
      { error: "Unauthorized", success: false },
      { status: 401 }
    );
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const { payload } = await jwtVerify(accessToken.value, secret);
    // request.userDataFromToken = payload;

    return NextResponse.next();
  } catch (accessErr) {
    console.log("Access token invalid or expired:", accessErr.message);

    return NextResponse.json(
      { error: "Unauthorized", success: false, msg: accessErr },
      { status: 401 }
    );
  }
}
