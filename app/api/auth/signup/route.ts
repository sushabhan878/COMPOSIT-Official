import connectDb from "@/lib/db"
import User from "@/models/user.model"
import bcrypt from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"

function generateCompositID() {
  const prefix = "CMP-26-"
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  return prefix + Array.from({ length: 5 })
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join("")
}

async function generateUniqueCompositID() {
  let compositId
  let exists = true

  while (exists) {
    compositId = generateCompositID()
    exists = (await User.exists({ compositId })) !== null
  }
  return compositId!
}

export async function POST(req: NextRequest) {
  try {
    await connectDb()

    const {
      name,
      email,
      mobile,
      password,
      referralCode,
    } = await req.json()

    if (!password || password.length < 6) {
      return NextResponse.json({ message: "Password too short" }, { status: 400 })
    }

    const existing = await User.findOne({ email })
    if (existing) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 })
    }

    // Validate referral (optional)
    let referredBySA = null
    if (referralCode) {
      const sa = await User.findOne({ saId: referralCode, role: "sa" })
      if (!sa) {
        return NextResponse.json({ message: "Invalid referral code" }, { status: 400 })
      }
      referredBySA = referralCode
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      name,
      email,
      mobile,
      role: "user",
      password: hashedPassword,
      saId: referredBySA,
      joinDate: new Date(),
      compositId: await generateUniqueCompositID(),
    })

    // Increment SA referral count
    if (referredBySA) {
      await User.updateOne(
        { saId: referredBySA, role: "sa" },
        { $inc: { numberOfReferrals: 1 } }
      )
    }

    return NextResponse.json({ message: "User registered", user }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}
