// import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function authMiddleware(request) {
  const accessToken = request.cookies.get("token");
  const refreshToken = request.cookies.get("refreshToken");

  if (!accessToken && !refreshToken) {
    return NextResponse.json(
      { error: "Unauthorized", success: false },
      { status: 401 }
    );
  }

  try {
    // Validate the access token
    if (accessToken) {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(
        accessToken.value ?? accessToken,
        secret
      );
      request.user = payload; // Attach user data to the request
      return NextResponse.next();
    }
  } catch (accessErr) {
    console.log("Access token invalid or expired:", accessErr.message);
    return NextResponse.json(
      { error: "Unauthorized", success: false, msg: accessErr },
      { status: 401 }
    );
  }

  try {
    if (refreshToken) {
      //   const decodedRefresh = jwt.verify(
      //     refreshToken,
      //     process.env.REFRESH_TOKEN_SECRET
      //   );

      const secret = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET);
      const { payload } = await jwtVerify(
        refreshToken.value ?? refreshToken,
        secret
      );

      const newAccessToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      const response = NextResponse.next();
      response.cookies.set("token", newAccessToken, {
        httpOnly: true,
        path: "/",
        secure: true,
        sameSite: "strict",
      });

      request.user = payload;
      return response;
    }
  } catch (refreshErr) {
    console.log("Refresh token invalid or expired:", refreshErr.message);
    return NextResponse.json(
      { error: "Unauthorized", success: false },
      { status: 401 }
    );
  }

  return NextResponse.json(
    { error: "Unauthorized", success: false },
    { status: 401 }
  );
}
