import Event from "@/models/event.model";
import User from "@/models/user.model";
import { useRouter } from "next/router";
import { NextRequest } from "next/server";

// function generateCompositID() {
//   let prefix = "";
//   const selectedEvent = Event.findOne({}); // Placeholder for actual event selection logic
//   const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//   return (
//     prefix +
//     Array.from({ length: 5 })
//       .map(() => chars[Math.floor(Math.random() * chars.length)])
//       .join("")
//   );
// }

// async function generateUniqueCompositID() {
//   let compositId;
//   let exists = true;

//   while (exists) {
//     compositId = generateCompositID();
//     exists = (await User.exists({ compositId })) !== null;
//   }
//   return compositId!;
// }

// export async function POST(req: NextRequest) {
//   const router = useRouter();

//   const { event } = router.query;
//   const prefix = `CMP-${event}-26-`;
//   console.log("Event from query:", event);
//   console.log("Generated prefix:", prefix);
// }
