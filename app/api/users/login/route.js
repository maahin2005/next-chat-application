import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import UserModel from "@/Models/users.model";
import bcrypt from "bcrypt"; // Assuming you're using bcrypt to compare passwords
import jwt from "jsonwebtoken"; // For generating the JWT token

export async function POST(req) {
  try {
    await connectDB();

    const { username, password, email } = await req.json();

    let user;

    if (email) {
      user = await UserModel.findOne({ email });
    }

    if (username) {
      user = await UserModel.findOne({ username });
    }

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          msg: "User not found! maybe, you are New to Letschat. Please do SignUp First!",
        },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, msg: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return NextResponse.json(
      { success: true, msg: `Glad to see you again! ${user.name}`, token },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        msg: `Oops! Fail to Login`,
      },
      { status: 500 }
    );
  }
}
