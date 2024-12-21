import { NextResponse } from "next/server";
import { verifyUserRole } from "./Middlewares/VarifyUserRole";
import { compareUserIdForCRUD } from "./Middlewares/compareUserIdForCRUD";

export async function middleware(request) {
  const url = request.nextUrl.pathname;

  if (url.startsWith("/api/users/admin")) {
    const response = await verifyUserRole(request);
    if (response.status !== 200) {
      return response;
    }
  }

  if (url.startsWith("/api/users/modifications")) {
    const response = await compareUserIdForCRUD(request);
    // console.log()
    if (response.status !== 200) {
      return response;
    }
  }
  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/users/admin/:path*", "/api/users/modifications/:path*"],
};
