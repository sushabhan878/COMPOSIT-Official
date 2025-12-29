import connectDb from "@/lib/db";
import User from "@/models/user.model";
import { generateOTP, hashOTP } from "@/lib/otp";
import { sendOTPEmail } from "@/lib/mail";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();
  await connectDb();

  const otp = generateOTP();
  const hashedOtp = hashOTP(otp);

  await User.findOneAndUpdate(
    { email },
    {
      otp: hashedOtp,
      otpExpires: new Date(Date.now() + 5 * 60 * 1000),
    },
    { upsert: true }
  );

  await sendOTPEmail(email, otp);

  return NextResponse.json({ message: "OTP sent successfully" });
}
