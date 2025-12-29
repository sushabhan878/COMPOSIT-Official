import connectDb from "@/lib/db";
import { hashOTP } from "@/lib/otp";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

function generateCompositID() {
  const prefix = "CMP-26-";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return (
    prefix +
    Array.from({ length: 5 })
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join("")
  );
}

async function generateUniqueCompositID() {
  let compositId;
  let exists = true;

  while (exists) {
    compositId = generateCompositID();
    exists = (await User.exists({ compositId })) !== null;
  }
  return compositId!;
}

function getSARankByReferrals(referrals: number) {
  if (referrals >= 50) return "Platinum";
  if (referrals >= 35) return "Gold";
  if (referrals >= 20) return "Silver";
  if (referrals >= 1) return "Bronze";
  return null;
}

export async function POST(req: NextRequest) {
  try {
    await connectDb();

    // We accept OTP and Password together here
    const { email, otp, password, referralCode } = await req.json();

    // 1. Validation
    if (!password || password.length < 6) {
      return NextResponse.json(
        { message: "Password too short" },
        { status: 400 }
      );
    }

    // 2. Find Pending User (Explicitly selecting hidden OTP fields)
    const user = await User.findOne({ email }).select("+otp +otpExpires");

    if (!user) {
      return NextResponse.json(
        { message: "Email not found. Restart signup." },
        { status: 404 }
      );
    }

    if (user.isVerified && user.password) {
      return NextResponse.json(
        { message: "User already registered." },
        { status: 400 }
      );
    }

    // 3. Verify OTP Logic
    if (!user.otp || !user.otpExpires || user.otpExpires < new Date()) {
      return NextResponse.json(
        { message: "OTP expired. Please request a new one." },
        { status: 400 }
      );
    }

    if (hashOTP(otp) !== user.otp) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }

    // --- OTP IS VALID, PROCEED TO REGISTRATION ---

    // 4. Referral Logic
    let referredBySA = null;
    if (referralCode) {
      const sa = await User.findOne({ saId: referralCode, role: "sa" });
      if (sa) {
        referredBySA = referralCode;
        // Update SA Stats
        const updatedSA = await User.findOneAndUpdate(
          { _id: sa._id },
          { $inc: { numberOfReferrals: 1 } },
          { new: true }
        );
        if (updatedSA) {
          const newRank = getSARankByReferrals(updatedSA.numberOfReferrals);
          if (newRank && newRank !== updatedSA.SARank) {
            await User.updateOne(
              { _id: updatedSA._id },
              { $set: { SARank: newRank } }
            );
          }
        }
      }
    }

    // 5. Finalize User Data
    const hashedPassword = await bcrypt.hash(password, 10);
    const compositId = await generateUniqueCompositID();

    user.password = hashedPassword;
    user.compositId = compositId;
    user.saId = referredBySA;
    user.joinDate = new Date();
    user.isVerified = true;

    // Clear OTP fields for security
    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();

    // 6. Send Welcome Email (Non-blocking)
    // sendWelcomeEmail(user.email, user.name);

    return NextResponse.json(
      { message: "Registration successful", user },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Signup Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// import connectDb from "@/lib/db";
// import User from "@/models/user.model";
// import bcrypt from "bcryptjs";
// import { NextRequest, NextResponse } from "next/server";

// function generateCompositID() {
//   const prefix = "CMP-26-";
//   const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//   return (
//     prefix +
//     Array.from({ length: 5 })
//       .map(() => chars[Math.floor(Math.random() * chars.length)])
//       .join("")
//   );
// }

// async function generateUniqueCompositID() {
//   let compositId;
//   let exists = true;

//   while (exists) {
//     compositId = generateCompositID();
//     exists = (await User.exists({ compositId })) !== null;
//   }
//   return compositId!;
// }

// function getSARankByReferrals(referrals: number) {
//   if (referrals >= 50) return "Platinum";
//   if (referrals >= 35) return "Gold";
//   if (referrals >= 20) return "Silver";
//   if (referrals >= 1) return "Bronze";
//   return null;
// }

// export async function POST(req: NextRequest) {
//   try {
//     await connectDb();

//     const { name, email, mobile, password, referralCode } = await req.json();

//     if (!password || password.length < 6) {
//       return NextResponse.json(
//         { message: "Password too short" },
//         { status: 400 }
//       );
//     }

//     const existing = await User.findOne({ email });
//     if (existing) {
//       return NextResponse.json(
//         { message: "User already exists" },
//         { status: 400 }
//       );
//     }

//     // Validate referral (optional)
//     let referredBySA = null;
//     if (referralCode) {
//       const sa = await User.findOne({ saId: referralCode, role: "sa" });
//       if (!sa) {
//         return NextResponse.json(
//           { message: "Invalid referral code" },
//           { status: 400 }
//         );
//       }
//       referredBySA = referralCode;
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({
//       name,
//       email,
//       mobile,
//       role: "user",
//       password: hashedPassword,
//       saId: referredBySA,
//       joinDate: new Date(),
//       compositId: await generateUniqueCompositID(),
//     });

//     // Increment SA referral count
//     if (referredBySA) {
//       const updatedSA = await User.findOneAndUpdate(
//         { saId: referredBySA, role: "sa" },
//         { $inc: { numberOfReferrals: 1 } },
//         { new: true } // ← CRITICAL
//       );

//       if (updatedSA) {
//         const newRank = getSARankByReferrals(updatedSA.numberOfReferrals);

//         if (newRank && newRank !== updatedSA.SARank) {
//           await User.updateOne(
//             { _id: updatedSA._id },
//             { $set: { SARank: newRank } }
//           );
//         }
//       }
//     }

//     return NextResponse.json(
//       { message: "User registered", user },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }
