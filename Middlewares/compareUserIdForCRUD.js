import { NextResponse, URLPattern } from "next/server";
import { jwtVerify } from "jose";

export async function compareUserIdForCRUD(req) {
  try {
    const token =
      req.cookies.get("authToken") ||
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

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    console.log("req.nextUrl: " + req.nextUrl);

    if (!payload) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid token" },
        { status: 401 }
      );
    }

    const userId = id === payload.id;

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
