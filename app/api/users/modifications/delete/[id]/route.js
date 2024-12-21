import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import UserModel from "@/Models/users.model";

export async function DELETE(req, { params }) {
  await connectDB();

  try {
    const { id } = await params; // Extract `id` from `params`

    if (!id) {
      return NextResponse.json(
        { success: false, msg: "ID is required" },
        { status: 400 }
      );
    }

    const user = await UserModel.findByIdAndDelete(id);

    if (!user) {
      return NextResponse.json(
        { success: false, msg: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, msg: "Profile deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error.message);
    return NextResponse.json(
      {
        success: false,
        msg: "Failed to delete profile",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
