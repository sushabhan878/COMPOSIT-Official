import connectDb from "@/lib/db";
import Team from "@/models/team.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const { teamId, compositId } = await req.json();

    if (!teamId || !compositId) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    // Fetch user
    const user = await User.findOne({ compositId }).lean();
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Ensure team exists
    const team = await Team.findOne({ teamId });
    if (!team) {
      return NextResponse.json({ message: "Team not found" }, { status: 404 });
    }

    // Check if already in team
    const alreadyInTeam = team.members.some(
      (m: any) => m.compositId === compositId,
    );

    if (alreadyInTeam) {
      return NextResponse.json(
        { message: "User already in the team" },
        { status: 409 },
      );
    }

    // Atomic update
    const updatedTeam = await Team.findOneAndUpdate(
      { teamId },
      {
        $addToSet: {
          members: {
            name: user.name,
            compositId,
          },
        },
      },
      { new: true },
    );

    return NextResponse.json(
      {
        message: "Member added successfully",
        team: updatedTeam,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Add member error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
