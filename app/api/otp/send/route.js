import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import redisClient from "@/utils/redisClient"; // Import the Redis client

export async function POST(req) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP

  // Configure nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail", // Replace with a real email service
    auth: {
      user: process.env.EMAIL, // Your email
      pass: process.env.EMAIL_PASSWORD, // Your email password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);

    console.log(email, otp)
    await redisClient.set(email, otp, "EX", 300);
    const storedOtp = await redisClient.get(email);
    console.log(storedOtp, otp)
    
    return NextResponse.json({ message: "OTP sent successfully" , success: true}, {status: 200});
  } catch (error) {
    console.error("Failed to send OTP:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
