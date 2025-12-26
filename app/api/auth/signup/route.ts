import connectDb from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";


function generateSAId() {
    const prefix = "SA-2026-";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomPart = "";

    for (let i = 0; i < 4; i++) {
      randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const SaId = prefix + randomPart;
    return SaId;
}

async function generateUniqueSAId() {
  let saId
  let exists = true

  while (exists) {
    saId = generateSAId()
    exists = (await User.exists({ saId })) !== null
  }

  return saId
}
  

function generateReferralLink(SaId: string) {
    const baseUrl = process.env.BASE_URL;
    return `${baseUrl}?ref=${SaId}&callbackUrl=/home`;
}



export async function POST(req: NextRequest) { 
    try {
        await connectDb();
        const {
            name,
            email,
            mobile,
            role,
            gender,
            collegeName,
            collegeId,
            department,
            city,
            state,
            password,
            referralCode,
        } = await req.json();
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                {message: "User already exists!"},
                {status: 400}
            )
        }
        if (password.length < 6) { 
            return NextResponse.json(
                { message: "Password must be at least 6 characters long." },
                {status: 400}
            )
        }

        if (!["user", "sa", "admin"].includes(role)) {
        return NextResponse.json(
            { message: "Invalid role" },
            { status: 400 }
        )
        }

        let saId = null;

        if (role === "user") {
        if (referralCode) {
            const saExists = await User.findOne({
            saId: referralCode,
            role: "sa",
            })

            if (!saExists) {
            return NextResponse.json(
                { message: "Invalid referral code" },
                { status: 400 }
            )
            }
        }
        saId = referralCode || null
        } else if (role === "sa") {
        saId = await generateUniqueSAId();
        } else {
        saId = null;
        }

        let referralLink = null;
        let referralQrLink = null;

        if (role === "sa") {
        referralLink = generateReferralLink(saId);
        }

        


        const hashedPassword = await bcrypt.hash(password, 10);


        const userData: any = {
                    name,
                    email,
                    mobile,
                    gender,
                    role,
                    collegeName,
                    collegeId,
                    department,
                    city,
                    state,
                    password: hashedPassword,
                    saId,
                    joinDate: new Date(),
        };

        if (role === "sa") {
            userData.referralLink = generateReferralLink(saId);
            userData.numberOfReferrals = 0;
            userData.SARank = "Bronze";
        }
        const user = await User.create(userData);

        if (role === "user" && referralCode) {
        await User.updateOne(
            { saId: referralCode, role: "sa" },
            { $inc: { numberOfReferrals: 1 } }
        );
        }

        return NextResponse.json(
            { message: "User created successfully", user},
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            {message: `Internal Server Error: ${error}`},
            {status: 500}
        )
    }

}