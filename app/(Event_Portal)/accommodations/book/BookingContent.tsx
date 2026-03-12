"use client";

import React, { useMemo, useState } from "react";
import AccommodationForm from "@/components/AccommodationForm";

type BookingContentProps = {
  compositId: string;
};

const BookingContent = ({ compositId }: BookingContentProps) => {
  const [selectedDate, setSelectedDate] = useState("");

  const paymentConfig = useMemo(() => {
    const oneDayOptions = new Set(["27-march", "28-march", "29-march"]);
    const twoDayOptions = new Set(["27-and-28-march", "28-and-29-march"]);

    if (oneDayOptions.has(selectedDate)) {
      return { qrSrc: "/300.jpeg", amountLabel: "Rs.300 (1 day stay)" };
    }

    if (twoDayOptions.has(selectedDate)) {
      return { qrSrc: "/600.jpeg", amountLabel: "Rs.600 (2 day stay)" };
    }

    if (selectedDate === "27-to-29-march") {
      return { qrSrc: "/800.jpeg", amountLabel: "Rs.800 (3 day stay)" };
    }

    return {
      qrSrc: "/300.jpeg",
      amountLabel: "Select stay dates to confirm amount",
    };
  }, [selectedDate]);

  return (
    <section className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <div className="lg:col-span-7 rounded-3xl bg-white/5 p-7 backdrop-blur-sm md:p-9">
        <h2 className="text-2xl font-semibold text-white">Booking Details</h2>

        <AccommodationForm
          compositId={compositId}
          onDateChange={setSelectedDate}
        />
      </div>

      <aside className="lg:col-span-5 rounded-3xl border border-amber-400/30 bg-white/5 p-7 md:p-9">
        <h2 className="text-2xl font-semibold text-white">Payment Details</h2>

        <div className="mt-6 flex justify-center rounded-2xl bg-white p-5">
          <img
            src={paymentConfig.qrSrc}
            alt="Accommodation payment QR code"
            width={360}
            height={360}
          />
        </div>

        <div className="mt-6 space-y-2 text-sm text-gray-300">
          <p>
            <span className="text-amber-300">Amount:</span>{" "}
            {paymentConfig.amountLabel}
          </p>
        </div>
      </aside>
    </section>
  );
};

export default BookingContent;
