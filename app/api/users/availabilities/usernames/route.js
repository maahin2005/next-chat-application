import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import UserModel from "@/Models/users.model";

export async function POST(req) {
  await connectDB();
  try {
    const { username } = await req.json();

    // Validate the incoming data
    if (!username || typeof username !== "string") {
      return NextResponse.json(
        { success: false, error: "Invalid or missing username" },
        { status: 400 }
      );
    }

    const userExists = await UserModel.exists({ username });

    return NextResponse.json(
      {
        success: true,
        available: !userExists,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking username availability:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
