import { NextResponse } from "next/server";
import { verifyUserRole } from "./Middlewares/VarifyUserRole";
import { compareUserIdForCRUD } from "./Middlewares/compareUserIdForCRUD";
import { authMiddleware } from "./Middlewares/authMiddleware";
import { checkAuth } from "./utils/auth";

export async function middleware(request) {
  const url = request.nextUrl.pathname;
  const isAuth = await checkAuth(request);

  if (
    !isAuth &&
    ["/discover/networks", "/dashboard", "/letschat"].includes(url)
  ) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (
    isAuth &&
    ["/auth/login", "/auth/signup", "/auth/signup/build-profile"].includes(url)
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (url.startsWith("/api/users/features")) {
    const response = await authMiddleware(request);
    if (response.status !== 200) {
      return response;
    }
  }

  if (url.startsWith("/api/users/dashboard")) {
    const response = await authMiddleware(request);
    if (response.status !== 200) {
      return response;
    }
  }

  if (url.startsWith("/api/users/admin")) {
    const response = await verifyUserRole(request);
    if (response.status !== 200) {
      return response;
    }
  }

  if (url.startsWith("/api/users/modifications")) {
    const response = await compareUserIdForCRUD(request);

    if (response.status !== 200) {
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/users/admin/:path*",
    "/api/users/modifications/:path*",
    "/api/users/features/:path*",
    "/dashboard",
    "/discover/networks",
    "/letschat",
    "/auth/login",
    "/auth/signup",
    "/api/users/dashboard/:path*",
  ],
};
