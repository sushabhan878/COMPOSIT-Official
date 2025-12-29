import connectDb from "@/lib/db";
import User from "@/models/user.model";
import { hashOTP } from "@/lib/otp";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, otp } = await req.json();
  await connectDb();

  const user = await User.findOne({ email });

  if (!user || !user.otp || !user.otpExpires)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  if (user.otpExpires < new Date())
    return NextResponse.json({ error: "OTP expired" }, { status: 400 });

  if (hashOTP(otp) !== user.otp)
    return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  return NextResponse.json({ message: "OTP verified successfully" });
}
