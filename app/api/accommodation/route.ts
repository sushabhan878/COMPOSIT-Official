import connectDb from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Accommodation from "@/models/accommodation.model";
import User from "@/models/user.model";
import Team from "@/models/team.model";
import cloudinary from "@/lib/cloudinary";
import { sendAccommodationApprovalEmail } from "@/lib/mail";

type TeamRecord = {
  event?: string | null;
};

// Upload Screenshot of payment and create accommodation request
const uploadScreenshot = async (file: File) => {
  if (!file) {
    throw new Error("No file uploaded");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise<string>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "composit-payments" }, (error, result) => {
        if (error) return reject(error);
        resolve(result?.secure_url || "");
      })
      .end(buffer);
  });
};

// export async function POST(req: NextRequest) {
//   await connectDb();

//   const { compositId, phone, date, transactionId, screenshot } =
//     await req.json();

//   if (!compositId || !phone || !date || !transactionId || !screenshot) {
//     return NextResponse.json(
//       { message: "Missing required fields" },
//       { status: 400 },
//     );
//   }

//   const existing = await Accommodation.findOne({ compositId }).lean();
//   if (existing) {
//     return NextResponse.json(
//       { message: "Accommodation request already exists" },
//       { status: 400 },
//     );
//   } else {
//     const accomodation = await Accommodation.create({
//       compositId,
//       phone,
//       date,
//       transactionId,
//       screenshot,
//     });
//     return NextResponse.json(
//       { message: "Accommodation request created successfully", accomodation },
//       { status: 201 },
//     );
//   }
// }

export async function POST(req: NextRequest) {
  await connectDb();

  const formData = await req.formData();

  const compositId = formData.get("compositId") as string;
  const phone = formData.get("phone") as string;
  const date = formData.get("date") as string;
  const file = formData.get("screenshot") as File;

  if (!compositId || !phone || !date || !file) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 },
    );
  }

  const existing = await Accommodation.findOne({ compositId }).lean();
  if (existing) {
    return NextResponse.json(
      { message: "Accommodation request already exists" },
      { status: 400 },
    );
  }

  const screenshotUrl = await uploadScreenshot(file);

  const accommodation = await Accommodation.create({
    compositId,
    phone,
    date,
    screenshot: screenshotUrl,
  });

  return NextResponse.json(
    { message: "Accommodation request created successfully", accommodation },
    { status: 201 },
  );
}

export async function GET() {
  await connectDb();

  const accommodations = await Accommodation.find()
    .sort({ createdAt: -1 })
    .lean();

  const normalizeCompositId = (value?: string | null) =>
    String(value || "")
      .trim()
      .toUpperCase();

  const escapeRegex = (value: string) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // enrich with user info if available
  const mapped = await Promise.all(
    accommodations.map(async (a) => {
      const user = await User.findOne({ compositId: a.compositId })
        .lean()
        .catch(() => null);

      const normalizedCompositId = normalizeCompositId(a.compositId);
      const compositIdPattern = new RegExp(
        `^\\s*${escapeRegex(normalizedCompositId)}\\s*$`,
        "i",
      );

      const teams = await Team.find({
        $or: [
          { leaderId: compositIdPattern },
          { "members.compositId": compositIdPattern },
        ],
      })
        .select("event")
        .lean<TeamRecord[]>()
        .catch((): TeamRecord[] => []);

      const events = Array.from(
        new Set(teams.map((team) => team?.event).filter(Boolean)),
      );

      return {
        _id: a._id,
        compositId: a.compositId,
        phone: a.phone,
        date: a.date,
        screenshot: a.screenshot,
        createdAt: a.createdAt,
        name: user?.name || null,
        events,
        hallName: a.hallName || null,
        isApproved: a.isApproved || false,
      };
    }),
  );

  return NextResponse.json({ accommodations: mapped }, { status: 200 });
}

export async function PATCH(req: NextRequest) {
  await connectDb();

  const {
    accommodationId,
    hallName,
    approvePayment,
  }: {
    accommodationId?: string;
    hallName?: string | null;
    approvePayment?: boolean;
  } = await req.json();

  if (!accommodationId) {
    return NextResponse.json(
      { message: "Accommodation ID is required" },
      { status: 400 },
    );
  }

  const accommodation = await Accommodation.findById(accommodationId);

  if (!accommodation) {
    return NextResponse.json(
      { message: "Accommodation not found" },
      { status: 404 },
    );
  }

  const trimmedHallName =
    typeof hallName === "string" ? hallName.trim() : undefined;

  if (typeof hallName === "string") {
    accommodation.hallName = trimmedHallName || undefined;
  }

  const shouldApprovePayment = Boolean(approvePayment);
  const wasAlreadyApproved = Boolean(accommodation.isApproved);

  if (shouldApprovePayment && !wasAlreadyApproved) {
    accommodation.isApproved = true;
  }

  if (typeof hallName === "string" || (shouldApprovePayment && !wasAlreadyApproved)) {
    await accommodation.save();
  }

  let emailStatus: "sent" | "failed" | "skipped" = "skipped";
  let emailReason: string | null = null;

  if (shouldApprovePayment && !wasAlreadyApproved) {
    const user = await User.findOne({ compositId: accommodation.compositId })
      .select("name email compositId")
      .lean()
      .catch(() => null);

    if (user?.email) {
      try {
        await sendAccommodationApprovalEmail({
          email: user.email,
          name: user.name,
          compositId: accommodation.compositId,
          date: accommodation.date,
          hallName: accommodation.hallName,
        });
        emailStatus = "sent";
      } catch (error) {
        emailStatus = "failed";
        emailReason =
          error instanceof Error ? error.message : "Unknown mail error";
        console.error("Accommodation approval email failed:", error);
      }
    } else {
      emailReason = "User email not found for this compositId";
    }
  }

  if (shouldApprovePayment && wasAlreadyApproved) {
    emailReason = "Already approved, mail not re-sent";
  }

  const message =
    shouldApprovePayment && typeof hallName === "string"
      ? "Hall updated and payment processed successfully"
      : shouldApprovePayment
        ? wasAlreadyApproved
          ? "Payment already approved"
          : "Payment approved successfully"
        : typeof hallName === "string"
          ? "Hall updated successfully"
          : "No changes made";

  return NextResponse.json(
    {
      message,
      accommodation,
      emailStatus,
      emailReason,
    },
    { status: 200 },
  );
}
