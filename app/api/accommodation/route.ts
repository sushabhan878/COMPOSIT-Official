import connectDb from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Accommodation from "@/models/accommodation.model";
import User from "@/models/user.model";
import cloudinary from "@/lib/cloudinary";

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
  const transactionId = formData.get("transactionId") as string;
  const file = formData.get("screenshot") as File;

  if (!compositId || !phone || !date || !transactionId || !file) {
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
    transactionId,
    screenshot: screenshotUrl,
  });

  return NextResponse.json(
    { message: "Accommodation request created successfully", accommodation },
    { status: 201 },
  );
}

export async function GET(req: NextRequest) {
  await connectDb();

  const accommodations = await Accommodation.find()
    .sort({ createdAt: -1 })
    .lean();

  // enrich with user info if available
  const mapped = await Promise.all(
    accommodations.map(async (a: any) => {
      const user = await User.findOne({ compositId: a.compositId })
        .lean()
        .catch(() => null);

      return {
        _id: a._id,
        compositId: a.compositId,
        phone: a.phone,
        date: a.date,
        transactionId: a.transactionId,
        screenshot: a.screenshot,
        createdAt: a.createdAt,
        name: user?.name || null,
        hallName: a.hallName || user?.collegeName || null,
        isApproved: a.isApproved || false,
      };
    }),
  );

  return NextResponse.json({ accommodations: mapped }, { status: 200 });
}

export async function PATCH(req: NextRequest) {
  await connectDb();

  const { accommodationId } = await req.json();

  if (!accommodationId) {
    return NextResponse.json(
      { message: "Accommodation ID is required" },
      { status: 400 },
    );
  }

  const accommodation = await Accommodation.findByIdAndUpdate(
    accommodationId,
    { isApproved: true },
    { new: true },
  );

  if (!accommodation) {
    return NextResponse.json(
      { message: "Accommodation not found" },
      { status: 404 },
    );
  }

  return NextResponse.json(
    { message: "Payment approved successfully", accommodation },
    { status: 200 },
  );
}
