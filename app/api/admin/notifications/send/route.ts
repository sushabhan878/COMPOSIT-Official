import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDb from "@/lib/db";
import User from "@/models/user.model";
import Notification from "@/models/notification.model";
import { remark } from "remark";
import html from "remark-html";
import { sendBulkEmail } from "@/lib/bulkEmail";

/* --------------------------------
 * POST: Send Bulk Notification
 * --------------------------------*/
export async function POST(req: Request) {
  try {
    /* -----------------------------
     * Auth (Admin only)
     ------------------------------*/
    const session = await auth();

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    /* -----------------------------
     * Parse Body
     ------------------------------*/
    const body = await req.json();

    const {
      category, // "user" | "sa" | "event"
      eventId, // required if category === "event"
      subject,
      body: bodyMarkdown,
    } = body;

    if (!category || !subject || !bodyMarkdown) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (category === "event" && !eventId) {
      return NextResponse.json(
        { error: "eventId is required for event notifications" },
        { status: 400 },
      );
    }

    await connectDb();

    /* -----------------------------
     * Resolve Recipients
     ------------------------------*/
    let users: { email: string }[] = [];

    if (category === "user") {
      users = await User.find({ role: "user" }, { email: 1, _id: 0 });
    } else if (category === "sa") {
      users = await User.find({ role: "sa" }, { email: 1, _id: 0 });
    } else if (category === "event") {
      users = await User.find(
        { registeredEvents: eventId },
        { email: 1, _id: 0 },
      );
    }

    const recipients = users.map((u) => u.email).filter(Boolean);

    if (recipients.length === 0) {
      return NextResponse.json(
        { error: "No recipients found" },
        { status: 400 },
      );
    }

    console.log("📨 Starting bulk email send");
    console.log("Recipients count:", recipients.length);

    /* -----------------------------
     * Markdown → HTML
     ------------------------------*/
    const processed = await remark().use(html).process(bodyMarkdown);

    const emailHtml = `
      <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #111;">
        ${processed.toString()}
        <hr style="margin-top: 40px;" />
        <p style="font-size: 12px; color: #666;">
          This is an official communication from Team COMPOSIT.
        </p>
      </div>
    `;

    /* -----------------------------
     * Send Bulk Email
     ------------------------------*/
    console.log("📤 Sending to:", emailHtml);

    await sendBulkEmail({
      to: recipients,
      subject,
      html: emailHtml,
      fromName: "Team COMPOSIT",
    });

    console.log("✅ Sent to:", recipients);

    /* -----------------------------
     * Store Notification Log
     ------------------------------*/
    await Notification.create({
      sentBy: session.user.id,
      category,
      eventId: category === "event" ? eventId : null,
      subject,
      bodyMarkdown,
      recipientsCount: recipients.length,
      sentAt: new Date(),
    });

    /* -----------------------------
     * Success
     ------------------------------*/
    return NextResponse.json({
      success: true,
      sent: recipients.length,
    });
  } catch (error) {
    console.error("Bulk notification error:", error);
    console.error("❌ Nodemailer error:", error);
    throw error;

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
