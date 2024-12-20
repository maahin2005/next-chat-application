import { NextResponse } from "next/server";
import { verifyUserRole } from "./Middlewares/VarifyUserRole";

export async function middleware(request) {
  const url = request.nextUrl.pathname;

  if (url.startsWith("/api/users/admin")) {
    const response = await verifyUserRole(request);
    if (response.status !== 200) {
      return response;
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/users/admin/:path*"], // Apply middleware to all routes under /admin
};
