import { NextResponse, URLPattern } from "next/server";
import { jwtVerify } from "jose";
import { decodeToken } from "@/utils/decodeToken";

export async function compareUserIdForCRUD(req) {
  try {
    const token =
      req.cookies.get("token") ||
      req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: Token is missing" },
        { status: 401 }
      );
    }

    let pattern;
    if (req.method === "DELETE") {
      pattern = new URLPattern({
        pathname: "/api/users/modifications/delete/:id",
      });
    }

    if (req.method === "PATCH") {
      pattern = new URLPattern({
        pathname: "/api/users/modifications/update/:id",
      });
    }

    const match = pattern.exec(req.nextUrl);
    const id = match?.pathname.groups.id;

    const payload = await decodeToken(token.value ?? token);

    if (!payload) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid token" },
        { status: 401 }
      );
    }

    const userId = id === payload.userId;

    if (!userId) {
      return NextResponse.json(
        {
          msg: `Protected User: You don't have permission to update this Profile`,
        },
        { status: 403 }
      );
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
