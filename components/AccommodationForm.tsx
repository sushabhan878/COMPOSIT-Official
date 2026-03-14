"use client";

import React, { useState } from "react";

type AccommodationFormProps = {
  compositId: string;
  onDateChange?: (selectedDate: string) => void;
};

const AccommodationForm = ({
  compositId,
  onDateChange,
}: AccommodationFormProps) => {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.append("compositId", compositId);

    try {
      const res = await fetch("/api/accommodation", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
      } else {
        setShowSuccess(true);
        form.reset();
        onDateChange?.("");
      }
    } catch (error) {
      alert("Failed to submit request");
    }

    setLoading(false);
  };

  return (
    <>
      <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Phone Number
          </label>

          <input
            name="phone"
            type="tel"
            required
            placeholder="Enter your phone number"
            className="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Select Stay Dates
          </label>

          <select
            name="date"
            required
            defaultValue=""
            onChange={(e) => onDateChange?.(e.target.value)}
            title="Select your stay dates"
            className="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none focus:border-amber-400"
          >
            <option value="" disabled>
              Choose your stay option
            </option>

            <option value="27-march">27th of March</option>
            <option value="28-march">28th of March</option>
            <option value="29-march">29th of March</option>

            <option value="27-and-28-march">27th and 28th of March</option>

            <option value="28-and-29-march">28th and 29th of March</option>

            <option value="27-to-29-march">27th to 29th of March</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="screenshot"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Upload Payment Screenshot
          </label>

          <input
            id="screenshot"
            name="screenshot"
            type="file"
            accept="image/*"
            required
            className="w-full cursor-pointer rounded-xl border border-dashed border-amber-400/40 bg-black/30 px-4 py-3 text-sm text-gray-300 file:mr-4 file:rounded-lg file:border-0 file:bg-amber-400 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-900 hover:file:bg-amber-300"
          />

          <p className="mt-2 text-xs text-gray-400">
            Upload the screenshot of your payment confirmation.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 inline-flex items-center justify-center rounded-full bg-amber-400 px-7 py-3 text-base font-semibold text-slate-900 shadow-lg shadow-amber-400/30 hover:-translate-y-1 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Booking Request"}
        </button>
      </form>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-md rounded-3xl border border-amber-400/30 bg-[#0f0f1a] p-8 text-center shadow-2xl">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-400/10">
              <svg
                className="h-8 w-8 text-amber-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">Request Submitted!</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">
              Your accommodation request has been sent to the COMPOSIT team. We
              will send a confirmation mail once our team verifies the payment
              details.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="mt-6 rounded-full bg-amber-400 px-8 py-2.5 text-sm font-semibold text-slate-900 hover:bg-amber-300 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AccommodationForm;
