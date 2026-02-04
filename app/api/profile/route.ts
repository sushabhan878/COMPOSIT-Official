import { auth } from "@/auth";
import connectDb from "@/lib/db";
import Team from "@/models/team.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { ratelimit } from "@/lib/redis";

export async function GET(req: NextRequest) {
  try {
    // Use IP-based rate limiting instead of global
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "anonymous";
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        { message: "Rate limit exceeded. Please try again in a minute." },
        { status: 429 },
      );
    }
    await connectDb();
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Try to find user by compositId first, then fall back to email
    const compositId = session.user.compositId;
    const userQuery = compositId
      ? { compositId }
      : { email: session.user.email };

    const user = await User.findOne(userQuery, { password: 0 }).lean();

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Use the actual compositId from the database user object
    const actualCompositId = user.compositId;

    const teams = actualCompositId
      ? await Team.find({
          $or: [
            { leaderId: actualCompositId },
            { "members.compositId": actualCompositId },
          ],
        }).lean()
      : [];

    return NextResponse.json(
      {
        user,
        teams,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Profile API Error:", error);
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : "No stack trace",
    );
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
