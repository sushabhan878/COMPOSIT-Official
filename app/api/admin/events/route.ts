import { auth } from "@/auth";
import connectDb from "@/lib/db";
import Team from "@/models/team.model";
import { NextResponse } from "next/server";
import { ratelimit } from "@/lib/redis";

export async function GET(req: Request) {
  try {
    const { success } = await ratelimit.limit("admin-events-api");
    if (!success) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429 },
      );
    }
    const session = await auth();

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDb();

    const { searchParams } = new URL(req.url);

    const page = Math.max(Number(searchParams.get("page")) || 1, 1);
    const limit = Math.min(Number(searchParams.get("limit")) || 20, 50);
    const search = searchParams.get("search")?.trim();

    const skip = (page - 1) * limit;

    /** ----------------------------
     *  MATCH STAGE
     -----------------------------*/
    const matchStage: any = {};

    if (search) {
      matchStage.$or = [
        { teamName: { $regex: search, $options: "i" } },
        { teamId: { $regex: search, $options: "i" } },
        { event: { $regex: search, $options: "i" } },
        { leaderId: { $regex: search, $options: "i" } },
        { "members.name": { $regex: search, $options: "i" } },
        { "members.compositId": { $regex: search, $options: "i" } },
      ];
    }

    /** ----------------------------
     *  AGGREGATION
     -----------------------------*/
    const teams = await Team.aggregate([
      { $match: matchStage },
      // Lookup leader details by compositId (leaderId)
      {
        $lookup: {
          from: "users",
          let: { leaderCompId: "$leaderId" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$compositId", "$$leaderCompId"] },
              },
            },
            { $project: { _id: 0, name: 1, compositId: 1 } },
          ],
          as: "leaderDetails",
        },
      },
      // Flatten leader and provide sensible fallback
      {
        $addFields: {
          leader: {
            $cond: [
              { $gt: [{ $size: "$leaderDetails" }, 0] },
              { $arrayElemAt: ["$leaderDetails", 0] },
              { name: null, compositId: "$leaderId" },
            ],
          },
        },
      },
      // Shape members to only include name and compositId
      {
        $addFields: {
          members: {
            $map: {
              input: "$members",
              as: "m",
              in: { name: "$$m.name", compositId: "$$m.compositId" },
            },
          },
        },
      },
      // Cleanup
      {
        $project: {
          _id: 0,
          teamName: 1,
          teamId: 1,
          event: 1,
          leader: 1,
          members: 1,
          createdAt: 1,
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
    ]);

    const totalTeams = await Team.countDocuments(matchStage);

    return NextResponse.json({
      teams,
      pagination: {
        page,
        limit,
        totalTeams,
        totalPages: Math.ceil(totalTeams / limit),
      },
    });
  } catch (error) {
    console.error("Admin teams fetch error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
