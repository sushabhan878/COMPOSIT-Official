import { auth } from "@/auth";
import connectDb from "@/lib/db";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
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
     *  MATCH STAGE (ONLY SA)
     -----------------------------*/
    const matchStage: any = { role: "sa" };

    if (search) {
      matchStage.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { saId: { $regex: search, $options: "i" } },
      ];
    }

    /** ----------------------------
     *  AGGREGATION
     -----------------------------*/
    const sas = await User.aggregate([
      { $match: matchStage },

      // 🔗 Count users referred by SA
      {
        $lookup: {
          from: "users",
          let: { saCode: "$saId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$role", "user"] },
                    { $eq: ["$saId", "$$saCode"] },
                  ],
                },
              },
            },
            { $project: { _id: 1 } },
          ],
          as: "referredUsers",
        },
      },

      // 📊 Derived fields
      {
        $addFields: {
          referralsCount: { $size: "$referredUsers" },
          notifyCount: { $size: { $ifNull: ["$notifications", []] } },
        },
      },

      // 🧹 Cleanup
      {
        $project: {
          referredUsers: 0,
        },
      },

      // 🏆 Sort for leaderboard
      { $sort: { referralsCount: -1, createdAt: 1 } },

      // 🧮 Numeric leaderboard rank
      {
        $setWindowFields: {
          sortBy: { referralsCount: -1 },
          output: {
            leaderboardRank: { $rank: {} },
          },
        },
      },

      // 🧹 Final projection
      {
        $project: {
          name: 1,
          email: 1,
          mobile: 1,
          saId: 1,
          joiningDate: "$createdAt",
          status: 1,
          team: 1,
          events: 1,
          accommodation: 1,

          referralsCount: 1,

          // ✅ STRING rank from DB
          SARank: 1,

          // ✅ NUMERIC position
          leaderboardRank: 1,

          certificateIssued: 1,
          notifyCount: 1,
        },
      },

      { $skip: skip },
      { $limit: limit },
    ]);

    const totalSAs = await User.countDocuments(matchStage);

    return NextResponse.json({
      sas,
      pagination: {
        page,
        limit,
        totalSAs,
        totalPages: Math.ceil(totalSAs / limit),
      },
    });
  } catch (error) {
    console.error("Admin SA fetch error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
