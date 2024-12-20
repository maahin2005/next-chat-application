import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import UserModel from "@/Models/users.model";

export async function GET() {
  try {
    await connectDB();
    const users = await UserModel.find();

    return NextResponse.json(
      { success: true, data: users, msg: "Letschat Users" },
      { status: 200 }
    );
  } catch (error) {
    console.log("ERROR : " + error.message);
    return NextResponse.json(
      { success: false, msg: "Failed to Signup", error: error.message },
      { status: 500 }
    );
  }
}
