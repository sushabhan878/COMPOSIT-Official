import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AccommodationForm from "@/components/AccommodationForm";

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

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7 rounded-3xl bg-white/5 p-7 backdrop-blur-sm md:p-9">
            <h2 className="text-2xl font-semibold text-white">
              Booking Details
            </h2>

            <AccommodationForm compositId={compositId} />
          </div>

          <aside className="lg:col-span-5 rounded-3xl border border-amber-400/30 bg-white/5 p-7 md:p-9">
            <h2 className="text-2xl font-semibold text-white">
              Payment Details
            </h2>

            <div className="mt-6 flex justify-center rounded-2xl bg-white p-5">
              <img
                src="/qr.jpeg"
                alt="Accommodation payment QR code"
                width={360}
                height={360}
              />
            </div>

            <div className="mt-6 space-y-2 text-sm text-gray-300">
              <p>
                <span className="text-amber-300">Amount:</span>
                ₹300 (1 day pass) / ₹800 (3 day pass)
              </p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
};

export default AccommodationBookingPage;
