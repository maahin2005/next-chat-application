import { connectDB } from "@/lib/mongoose";
import Dummy from "@/Models/dummy.model";
import { NextResponse } from "next/server";

// Handle POST request to create a new user
export async function POST(req: Request) {
  await connectDB();

  try {
    const body = await req.json();
    const { name, desc } = body;

    const data = await Dummy.create({ name, desc });
    return NextResponse.json({ success: true, data: data }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to create data" },
      { status: 500 }
    );
  }
}

// Handle GET request to fetch data
export async function GET() {
  await connectDB();  

  try {
    const data = await Dummy.find();
    return NextResponse.json({ success: true, data: data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
