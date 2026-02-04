import { NextResponse } from "next/server";
import { ratelimit } from "@/lib/redis";

export async function POST(req: Request) {
  try {
    const { success } = await ratelimit.limit("referral-api");
    if (!success) {
      return NextResponse.json(
        { success: false, message: "Rate limit exceeded" },
        { status: 429 },
      );
    }
  } catch (error) {
    console.error("Rate limit error:", error);
  }

  const { referralCode } = await req.json();

  if (!referralCode) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const res = NextResponse.json({ success: true });

  res.cookies.set("referralCode", referralCode, {
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return res;
}
