import React from "react";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import AccommodationMerchPopup from "@/components/AccommodationMerchPopup";

const Accommodations = async () => {
  const session = await auth();

  return (
    <main className="relative w-full overflow-hidden py-20 mt-16 lg:py-28">
      <AccommodationMerchPopup />
      <div className="mx-auto max-w-6xl px-[5vw]">
        <div className="mb-12 space-y-3 text-center">
          <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            Accommodations
          </h1>
          <div className="mx-auto h-1 w-24 rounded-full bg-linear-to-r from-amber-400 to-orange-500" />
          <p className="mx-auto max-w-3xl text-base text-gray-300 md:text-lg">
            Stay close to the action and experience COMPOSIT 2026 from the heart
            of IIT Kharagpur.
          </p>
        </div>

        <section className="rounded-3xl bg-white/5 p-8 backdrop-blur-sm md:p-10">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            Why stay on campus?
          </h2>
          <p className="mt-4 text-gray-300 md:text-lg leading-relaxed">
            Wake up inside one of India’s most iconic campuses, walk through the
            vibrant IIT Kharagpur atmosphere, and be just minutes away from
            every event, lecture, and networking opportunity. COMPOSIT is more
            than a fest—it is a chance to learn, connect, and create
            unforgettable memories with participants from across the country.
          </p>
          <p className="mt-3 text-gray-300 md:text-lg leading-relaxed">
            Join us, feel the energy of innovation, and make your IIT Kharagpur
            experience truly complete.
          </p>
        </section>
        <section className="mt-10 rounded-3xl border-2 border-red-500/50 bg-red-500/10 p-8 backdrop-blur-sm md:p-10">
          <h3 className="text-xl font-bold text-red-300 md:text-2xl">
            ⚠️ Important: Mandatory Accommodation Booking
          </h3>
          <p className="mt-4 text-gray-300 md:text-lg leading-relaxed">
            <span className="font-semibold text-red-200">
              Each and every participant must book their accommodation
              individually.
            </span>{" "}
            Whether you are attending a single event or the entire fest,
            accommodation booking is mandatory for all participants staying on
            campus. Please ensure you complete your booking as early as possible
            to secure your preferred stay duration.
          </p>
        </section>
        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-white md:text-3xl text-center">
            Accommodation Pricing
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-amber-400/30 bg-linear-to-br from-white/5 to-white/2 p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/20">
              <p className="text-sm uppercase tracking-wider text-amber-300">
                1 Day Stay
              </p>
              <p className="mt-3 text-4xl font-bold text-white">₹300</p>
              <p className="mt-3 text-gray-300">
                Best for participants joining selected events for a single day.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-400/30 bg-linear-to-br from-white/5 to-white/2 p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/20">
              <p className="text-sm uppercase tracking-wider text-amber-300">
                3 Day Pass
              </p>
              <p className="mt-3 text-4xl font-bold text-white">₹800</p>
              <p className="mt-3 text-gray-300">
                Great value for the full COMPOSIT experience across all fest
                days.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href={session?.user ? "/accommodations/book" : "/signin"}
              className="inline-flex items-center justify-center rounded-full bg-amber-400 px-7 py-3 text-base font-semibold text-slate-900 shadow-lg shadow-amber-400/30 transition-transform duration-300 hover:-translate-y-1 hover:shadow-amber-400/50"
            >
              {session?.user
                ? "Book Accommodation"
                : "Login to Book Accommodation"}
            </Link>
          </div>
        </section>

        <section className="mt-14 rounded-3xl border border-amber-400/25 bg-linear-to-br from-white/5 to-amber-500/5 p-8 backdrop-blur-sm md:p-10">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold text-white md:text-3xl">
                Also Checkout Our Official Merch
              </h2>
              <p className="mt-4 text-gray-300 md:text-lg leading-relaxed">
                Take a piece of COMPOSIT home with you. Our official merch is
                designed to keep the fest energy alive long after the events
                end.
              </p>
              <p className="mt-3 text-gray-300 md:text-lg leading-relaxed">
                Grab your merch now, wear it on campus, and be part of the
                COMPOSIT vibe from day one.
              </p>

              <Link
                href="/participation-merch"
                className="mt-6 inline-flex items-center justify-center rounded-full border border-amber-300/40 bg-amber-400/15 px-7 py-3 text-base font-semibold text-amber-200 shadow-lg shadow-amber-500/15 transition-transform duration-300 hover:-translate-y-1 hover:bg-amber-400/25"
              >
                Explore Official Merch
              </Link>
            </div>

            <div className="overflow-hidden rounded-2xl border border-amber-400/25 bg-black/20 p-2">
              <Image
                src="/merch 4.png"
                alt="Official COMPOSIT merch design"
                width={900}
                height={900}
                className="h-full w-full rounded-xl object-cover"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Accommodations;
