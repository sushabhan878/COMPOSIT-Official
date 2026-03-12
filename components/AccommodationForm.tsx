"use client";

import React, { useState } from "react";

const AccommodationForm = ({ compositId }: { compositId: string }) => {
  const [loading, setLoading] = useState(false);

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
        alert("Accommodation request submitted successfully!");
        form.reset();
      }
    } catch (error) {
      alert("Failed to submit request");
    }

    setLoading(false);
  };

  return (
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
  );
};

export default AccommodationForm;
