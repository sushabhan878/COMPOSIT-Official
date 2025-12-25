import connectDb from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

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
            saId,
            joinDate,
            referralLink,
            referralQrLink,
            numberOfReferrals,
            SARank,
            
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
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create(
            {
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
                referralLink,
                referralQrLink,
                numberOfReferrals,
                SARank,

            }
        )
        return NextResponse.json(
            { message: "User created successfully", user },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            {message: `Internal Server Error: ${error}`},
            {status: 500}
        )
    }

}