import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import UserModel from "@/Models/users.model";

export async function POST(req) {
  await connectDB();
  try {
    const { email } = await req.json();

    // Validate the incoming data
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "Invalid or missing email" },
        { status: 400 }
      );
    }

    const userExists = await UserModel.exists({ email });

    return NextResponse.json(
      {
        success: true,
        available: !userExists,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking email availability:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}