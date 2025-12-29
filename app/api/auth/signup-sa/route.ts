import connectDb from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

function generateSAId() {
  const prefix = "SA-2026-";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return (
    prefix +
    Array.from({ length: 4 })
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join("")
  );
}

async function generateUniqueSAId() {
  let saId;
  let exists = true;

  while (exists) {
    saId = generateSAId();
    exists = (await User.exists({ saId })) !== null;
  }
  return saId!;
}

function generateReferralLink(saId: string) {
  return `${process.env.BASE_URL}?ref=${saId}&callbackUrl=/home`;
}

export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const {
      name,
      email,
      mobile,
      gender,
      collegeName,
      collegeId,
      department,
      city,
      state,
      password,
    } = await req.json();

    if (!password || password.length < 6) {
      return NextResponse.json(
        { message: "Password too short" },
        { status: 400 }
      );
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const saId = await generateUniqueSAId();
    const referralLink = generateReferralLink(saId);
    const hashedPassword = await bcrypt.hash(password, 10);

    const sa = await User.create({
      name,
      email,
      mobile,
      gender,
      role: "sa",
      collegeName,
      collegeId,
      department,
      city,
      state,
      password: hashedPassword,
      saId,
      referralLink,
      numberOfReferrals: 0,
      SARank: null,
      joinDate: new Date(),
    });

    return NextResponse.json({ message: "SA registered", sa }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
