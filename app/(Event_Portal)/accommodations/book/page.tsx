import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import BookingContent from "./BookingContent";

const AccommodationBookingPage = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  const { compositId } = session.user;

  if (!compositId) {
    redirect("/signin");
  }

  return (
    <main className="relative w-full overflow-hidden py-20 mt-16 lg:py-28">
      <div className="mx-auto max-w-7xl px-[5vw]">
        <div className="mb-12 space-y-3 text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Book Accommodation
          </h1>

          <p className="mx-auto max-w-3xl text-gray-300">
            Complete your booking details and upload your payment screenshot.
          </p>
        </div>

        <BookingContent compositId={compositId} />
      </div>
    </main>
  );
};

export default AccommodationBookingPage;
