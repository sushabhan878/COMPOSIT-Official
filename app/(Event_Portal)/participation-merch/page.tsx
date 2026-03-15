"use client";

import React, { useState } from "react";

const merchMockups = [
  {
    src: "/merch 3.png",
    alt: "COMPOSIT merch mockup 1",
  },
  {
    src: "/front.png",
    alt: "COMPOSIT merch mockup 2",
  },
  {
    src: "/merch 4.png",
    alt: "COMPOSIT merch mockup 3",
  },
  {
    src: "/merch.png",
    alt: "COMPOSIT merch mockup 4",
  },
];

const GOOGLE_FORM_URL = "https://forms.gle/5wAu5wHneRVPGd7k6";

const ParticipationMerchPage = () => {
  const [selectedMockup, setSelectedMockup] = useState(0);

  return (
    <main className="relative mt-16 w-full overflow-hidden py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-[5vw]">
        <div className="mb-12 space-y-3 text-center">
          <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            Official COMPOSIT Merch
          </h1>
          <div className="mx-auto h-1 w-24 rounded-full bg-linear-to-r from-amber-400 to-orange-500" />
          <p className="mx-auto max-w-3xl text-base text-gray-300 md:text-lg">
            Reserve your official COMPOSIT merchandise and submit payment proof
            through the Google Form.
          </p>
        </div>

        <section className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:p-10">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Order via Google Form
            </h2>
            <p className="mt-3 text-sm text-gray-300 md:text-base">
              We are taking all merch orders through Google Form only.
            </p>

            <div className="mt-5 rounded-2xl border border-amber-400/30 bg-black/30 p-4">
              <p className="text-xs uppercase tracking-wide text-amber-300">
                Official Merch Price
              </p>
              <p className="mt-1 text-2xl font-bold text-white">Rs 449</p>
              <p className="mt-1 text-xs text-gray-400">
                Complete payment of Rs 449, then submit your order details and
                payment proof in the Google Form.
              </p>
            </div>

            <div className="mt-7 space-y-4">
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-xl bg-amber-400 px-5 py-3 text-base font-semibold text-slate-900 shadow-lg shadow-amber-400/30 transition hover:-translate-y-0.5 hover:bg-amber-300"
              >
                Open Order Form
              </a>

              <p className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm leading-relaxed text-gray-300">
                The form includes name, contact details, and payment screenshot
                upload. Please submit only once for each merch order.
              </p>

              <p className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm leading-relaxed text-gray-300">
                Wear the COMPOSIT spirit, carry the fest with you, and make this
                edition memorable beyond the event days.
              </p>

              <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-4 text-sm leading-relaxed text-amber-100/90">
                Collect your merch from the registration desk after reaching the
                campus.
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:p-10">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Merch Mockups
            </h2>
            <p className="mt-3 text-sm text-gray-300 md:text-base">
              Preview some sample looks of official COMPOSIT merchandise.
            </p>

            <div className="mt-7 space-y-4">
              <div className="overflow-hidden rounded-2xl border border-amber-400/20 bg-white/5 p-2">
                <img
                  src={merchMockups[selectedMockup].src}
                  alt={merchMockups[selectedMockup].alt}
                  className="h-80 w-full rounded-xl object-cover md:h-96"
                />
              </div>

              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {merchMockups.map((mockup, index) => (
                  <button
                    key={mockup.src}
                    type="button"
                    onClick={() => setSelectedMockup(index)}
                    className={`overflow-hidden rounded-xl border bg-white/5 transition ${
                      selectedMockup === index
                        ? "border-amber-400 shadow-md shadow-amber-400/30"
                        : "border-white/15 hover:border-amber-300/70"
                    }`}
                    aria-label={`View ${mockup.alt}`}
                  >
                    <img
                      src={mockup.src}
                      alt={mockup.alt}
                      className="h-20 w-full object-cover md:h-24"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ParticipationMerchPage;
