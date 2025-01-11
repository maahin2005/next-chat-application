import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully!",
  });

  response.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
    sameSite: "strict",
  });

  response.cookies.set("next-auth.session-token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
    sameSite: "strict",
  });


  return response;
}
