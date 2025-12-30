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
     *  MATCH STAGE
     -----------------------------*/
    const matchStage: any = { role: "user" };

    if (search) {
      matchStage.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { compositId: { $regex: search, $options: "i" } },
        { saId: { $regex: search, $options: "i" } },
      ];
    }

    /** ----------------------------
     *  AGGREGATION
     -----------------------------*/
    const users = await User.aggregate([
      { $match: matchStage },

      // 🔗 Lookup SA by saId
      {
        $lookup: {
          from: "users",
          let: { saId: "$saId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$role", "sa"] },
                    { $eq: ["$saId", "$$saId"] },
                  ],
                },
              },
            },
            { $project: { name: 1, _id: 0 } },
          ],
          as: "saDetails",
        },
      },

      // 🧠 Decide referredBy display
      {
        $addFields: {
          referredBy: {
            $cond: [
              { $gt: [{ $size: "$saDetails" }, 0] },
              { $arrayElemAt: ["$saDetails.name", 0] },
              "Direct",
            ],
          },
        },
      },

      // 🧹 Cleanup
      {
        $project: {
          saDetails: 0,
        },
      },

      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
    ]);

    const totalUsers = await User.countDocuments(matchStage);

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
      },
    });
  } catch (error) {
    console.error("Admin users search error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
