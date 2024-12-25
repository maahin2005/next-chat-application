import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const otpStore = {}; // Temporary in-memory store

export async function POST(req) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP

  // Save OTP to in-memory store (use a database like Redis for production)
  otpStore[email] = otp;

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
    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Failed to send OTP:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
