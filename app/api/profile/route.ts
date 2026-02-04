import { auth } from "@/auth";
import connectDb from "@/lib/db";
import Team from "@/models/team.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const compositId = session.user.compositId;

    const user = await User.findOne(
      {
        compositId,
      },
      { password: 0 },
    ).lean();

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const teams = await Team.find({
      $or: [{ leaderId: compositId }, { "members.compositId": compositId }],
    }).lean();

    return NextResponse.json(
      {
        user,
        teams,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
