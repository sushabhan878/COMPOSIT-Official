import connectDb from "@/lib/db";
import Team from "@/models/team.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

const EVENT_PREFIX_MAP: Record<string, string> = {
  Technova: "TNV",
  Casestudy: "GCS",
  Enigma: "ENG",
  Excavate: "EXC",
  Ideathon: "IDT",
  Metacli: "MTX",
  Metacode: "MTC",
};

export function generateTeamId(event: string): string {
  const prefix = EVENT_PREFIX_MAP[event];

  if (!prefix) {
    throw new Error(`Invalid event name: ${event}`);
  }

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let random = "";

  for (let i = 0; i < 6; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return `${prefix}-${random}`;
}

async function generateUniqueTeamId(event: string) {
  for (let i = 0; i < 5; i++) {
    const teamId = generateTeamId(event);
    const existing = await Team.findOne({ teamId }).lean();

    if (!existing) return teamId;
  }

  throw new Error("Failed to generate unique team ID");
}

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const { teamName, event, members, leaderId } = await req.json();

    if (!teamName || !event || !members || members.length === 0 || !leaderId) {
      return NextResponse.json(
        { message: "Invalid team data" },
        { status: 400 }
      );
    }
    for (const member of members) {
      const user = await User.findOne({ compositId: member.compositId });

      if (!user) {
        return NextResponse.json(
          { message: `User with id ${member.compositId} not found` },
          { status: 404 }
        );
      }
    }

    const teamId = await generateUniqueTeamId(event);

    const team = await Team.create({
      teamName,
      teamId,
      leaderId,
      event,
      members: members.map((m: any) => ({
        name: m.name,
        compositId: m.compositId,
      })),
    });

    return NextResponse.json(
      { message: "Team created successfully", team },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
