import { auth } from "@/auth";
import connectDb from "@/lib/db";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();

    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const topAmbassadors = await User.find(
      { role: "sa" },
      {
        name: 1,
        email: 1,
        image: 1,
        collegeName: 1,
        city: 1,
        state: 1,
        numberOfReferrals: 1,
        referralLink: 1,
        referralQrLink: 1,
        compositId: 1,
      },
    )
      .sort({ numberOfReferrals: -1, createdAt: 1 })
      .limit(5)
      .lean();

    const currentUser = await User.findOne(
      { email: session.user.email },
      {
        name: 1,
        email: 1,
        image: 1,
        role: 1,
        collegeName: 1,
        city: 1,
        state: 1,
        numberOfReferrals: 1,
        referralLink: 1,
        referralQrLink: 1,
        compositId: 1,
      },
    ).lean();

    if (!currentUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const currentReferrals = currentUser.numberOfReferrals || 0;
    const higherReferralCount = await User.countDocuments({
      role: "sa",
      numberOfReferrals: { $gt: currentReferrals },
    });

    const currentUserRank = higherReferralCount + 1;

    const normalizedTopAmbassadors = topAmbassadors.map((user, index) => ({
      rank: index + 1,
      name: user.name,
      email: user.email,
      college: user.collegeName || "Not provided",
      city: user.city || user.state || "Not provided",
      referrals: user.numberOfReferrals || 0,
      avatar: user.image || "",
      compositId: user.compositId || "",
      referralLink: user.referralLink || "",
      referralQrLink: user.referralQrLink || "",
    }));

    const normalizedCurrentUser = {
      rank: currentUserRank,
      name: currentUser.name,
      email: currentUser.email,
      role: currentUser.role,
      referrals: currentUser.numberOfReferrals || 0,
      college: currentUser.collegeName || "Not provided",
      city: currentUser.city || currentUser.state || "Not provided",
      avatar: currentUser.image || "",
      compositId: currentUser.compositId || "",
      qrLink: currentUser.referralLink || "",
      qrImage: currentUser.referralQrLink || "",
    };

    return NextResponse.json(
      {
        topAmbassadors: normalizedTopAmbassadors,
        currentUser: normalizedCurrentUser,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Leaderboard fetch error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
