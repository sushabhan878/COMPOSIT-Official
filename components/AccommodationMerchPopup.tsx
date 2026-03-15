"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const AccommodationMerchPopup = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-amber-400/35 bg-[#0f0f1a] shadow-2xl">
        <button
          type="button"
          aria-label="Close popup"
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/35 text-xl leading-none text-white transition hover:border-amber-300 hover:text-amber-200"
        >
          ×
        </button>

        <div className="grid grid-cols-1 items-stretch md:grid-cols-2">
          <div className="relative min-h-60">
            <Image
              src="/Participant-Merch.png"
              alt="Official COMPOSIT merch"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="p-6 md:p-7">
            <p className="text-xs uppercase tracking-[0.18em] text-amber-300">
              COMPOSIT 2026
            </p>
            <h3 className="mt-2 text-2xl font-bold text-white">
              Make Your Campus Stay More Memorable
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">
              Book your accommodation, settle in comfortably, and complete your
              COMPOSIT experience with our official merch.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-gray-300">
              Limited pieces available at Rs 449. Reserve yours now.
            </p>

            <div className="mt-6">
              <Link
                href="/participation-merch"
                className="inline-flex items-center justify-center rounded-full bg-amber-400 px-6 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-amber-300"
              >
                View Official Merch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccommodationMerchPopup;
