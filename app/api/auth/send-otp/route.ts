import { NextResponse } from "next/server";
import connectDb from "@/lib/db";
import User from "@/models/user.model";
import { generateOTP, hashOTP } from "@/lib/otp";
import { sendOTPEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();
    await connectDb();

    // 1. Check if user is already fully registered
    let user = await User.findOne({ email });

    if (user?.isVerified) {
      return NextResponse.json(
        { message: "User already exists. Please login." },
        { status: 400 }
      );
    }

    // 2. Generate OTP (No arguments needed based on your function)
    const otp = generateOTP();
    const hashedOtp = hashOTP(otp);
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    // 3. Upsert User
    if (user) {
      user.name = name;
      user.otp = hashedOtp;
      user.otpExpires = otpExpires;
      await user.save();
    } else {
      user = await User.create({
        name,
        email,
        otp: hashedOtp,
        otpExpires,
        isVerified: false,
      });
    }

    // 4. Send Email
    await sendOTPEmail(email, otp);

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error: any) {
    console.error("OTP Route Error:", error); // Logs error to terminal
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
