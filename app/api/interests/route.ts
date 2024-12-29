import { connectDB } from "@/lib/mongoose";
import InsterestModel from "@/Models/interests.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();

  try {
    const body = await req.json();
    const { heading, about, imgUrl } = body;

    const data = await InsterestModel.create({ heading, about, imgUrl });
    return NextResponse.json({ success: true, data: data }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to create data" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectDB();

  try {
    const data = await InsterestModel.find();
    return NextResponse.json({ success: true, data: data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
