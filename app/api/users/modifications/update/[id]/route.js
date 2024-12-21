import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import UserModel from "@/Models/users.model";

export async function PATCH(request, { params }) {
  await connectDB();
  const { id } = await params;

  try {
    const body = await request.json();

    const user = await UserModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return NextResponse.json(
        { success: false, msg: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, msg: "Profile updated successfully", data: user },
      { status: 200 }
    );
  } catch (error) {
    console.error(error.message);
    return NextResponse.json(
      { success: false, msg: "Failed to update profile", error: error.message },
      { status: 500 }
    );
  }
}
