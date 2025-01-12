import { NextResponse } from "next/server";
import redisClient from "@/utils/redisClient"; // Import the Redis client

export async function POST(req) {
  const { email, otp } = await req.json();
  console.log(email, otp)

  if (!email || !otp) {
    return NextResponse.json(
      { error: "Email and OTP are required" },
      { status: 400 }
    );
  }
    return NextResponse.json({ error: "hi" }, { status: 500 });
// 
  // try {
  //   // Retrieve OTP from Redis
  //   const storedOtp = await redisClient.get(email);

  //   if (!storedOtp) {
  //     return NextResponse.json(
  //       { error: "OTP has expired or does not exist" },
  //       { status: 400 }
  //     );
  //   }

  //   if (storedOtp == Number(otp)) {
  //     // Delete OTP after successful verification
  //     await redisClient.del(email);

  //     return NextResponse.json({ message: "OTP verified successfully", success:true }, {status: 200});
  //   } else {
  //     return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
  //   }
  // } catch (error) {
  //   console.error("Failed to verify OTP:", error.message);
  //   return NextResponse.json({ error: error.message }, { status: 500 });
  // }
}
