// import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function verifyUserRole(req) {
  try {
    const token = req.cookies.get("token") || req.cookies.get("refreshToken");
    req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: Token is missing", success: false },
        { status: 401 }
      );
    }

    // Verify the token
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token.value ?? token, secret);

    if (!payload) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid token", success: false },
        { status: 401 }
      );
    }

    // Attach the user role or other information from the token
    const userRole = payload.role;

    // Check the user's role
    if (userRole === "User") {
      return NextResponse.json(
        {
          error:
            "Forbidden: You do not have access to this content - Your Role is " +
            userRole,
          success: false,
        },
        { status: 403 }
      );
    }

    // Allow the request to proceed
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
}
