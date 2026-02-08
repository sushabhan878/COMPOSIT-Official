import { NextResponse } from "next/server";

export async function POST(req: Request) {
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
