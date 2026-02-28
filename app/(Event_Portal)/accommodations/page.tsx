import React from "react";
import Link from "next/link";
import { auth } from "@/auth";

const Accommodations = async () => {
  const session = await auth();

  return (
    <main className="relative w-full overflow-hidden py-20 mt-16 lg:py-28">
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
      </div>
    </main>
  );
};

export default Accommodations;
