import connectDb from "@/lib/db";
import Team from "@/models/team.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const { teamId, compositId } = await req.json();

    // 1️⃣ Validate input
    if (!teamId || !compositId) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    // 2️⃣ Fetch user (single source of truth)
    const user = await User.findOne({ compositId }).lean();
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 3️⃣ Atomic update (NO race condition)
    const updatedTeam = await Team.findOneAndUpdate(
      {
        teamId,
        "members.compositId": { $ne: compositId },
      },
      {
        $push: {
          members: {
            name: user.name,
            compositId,
          },
        },
      },
      { new: true }
    );

    if (!updatedTeam) {
      return NextResponse.json(
        {
          message: "Team not found or user already in the team",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        message: "Member added successfully",
        team: updatedTeam,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Add member error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
