import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import UserModel from "@/Models/users.model";

export async function POST(req) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the request body
    const body = await req.json();

    // Check for the key sent by the frontend
    if (body.isPostByFE) {
      // Fetch all usernames from the database
      const users = await UserModel.find({}, "username");
      const usernames = users.map((user) => user.username);

      // Return the list of usernames
      return NextResponse.json({ success:true,usernames }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Invalid request or missing key" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error fetching usernames:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
