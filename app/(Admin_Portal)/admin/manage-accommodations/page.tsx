"use client";

import React, { useEffect, useState } from "react";

type Accom = {
  _id: string;
  compositId: string;
  phone: string;
  date: string;
  transactionId: string;
  screenshot: string;
  createdAt?: string;
  name?: string | null;
  events?: string[];
  hallName?: string | null;
  isApproved?: boolean;
};

const HALL_OPTIONS = [
  "RK Hall",
  "Patel Hall",
  "Azad Hall",
  "Nehru Hall",
  "LBS Hall",
  "MMM Hall",
  "SN/IG Hall",
];

const ManageAccommodations = () => {
  const [items, setItems] = useState<Accom[]>([]);
  const [loading, setLoading] = useState(false);
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [hallSelections, setHallSelections] = useState<Record<string, string>>(
    {},
  );
  const [savingHallId, setSavingHallId] = useState<string | null>(null);

  const fetchAccommodations = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/accommodation");
      const data = await res.json();
      const accommodations = data.accommodations || [];
      setItems(accommodations);
      setHallSelections(
        accommodations.reduce(
          (acc: Record<string, string>, item: Accom) => {
            acc[item._id] = item.hallName || "";
            return acc;
          },
          {},
        ),
      );
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const approvePayment = async (accommodationId: string) => {
    if (!confirm("Are you sure you want to approve this payment?")) {
      return;
    }

    setApprovingId(accommodationId);
    try {
      const res = await fetch("/api/accommodation", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accommodationId,
          approvePayment: true,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Payment approved successfully!");
        fetchAccommodations(); // Refresh the list
      } else {
        alert(data.message || "Failed to approve payment");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while approving payment");
    }
    setApprovingId(null);
  };

  const saveHall = async (accommodationId: string) => {
    setSavingHallId(accommodationId);
    try {
      const res = await fetch("/api/accommodation", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accommodationId,
          hallName: hallSelections[accommodationId] || "",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Hall updated successfully!");
        setItems((prev) =>
          prev.map((item) =>
            item._id === accommodationId
              ? { ...item, hallName: hallSelections[accommodationId] || null }
              : item,
          ),
        );
      } else {
        alert(data.message || "Failed to update hall");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while updating hall");
    }
    setSavingHallId(null);
  };

  useEffect(() => {
    // Initial data load for the admin table.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchAccommodations();
  }, []);

  return (
    <div className="mt-36 p-8">
      <div className="w-full max-w-screen-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">
          Manage Accommodations
        </h1>
        {loading ? (
          <div className="text-white">Loading...</div>
        ) : (
          <div className="overflow-x-auto backdrop-blur-xl bg-white/5 border border-white/15 rounded-2xl">
            <table className="w-full table-fixed">
              <thead className="bg-white/10 border-b border-white/15">
                <tr>
                  <th className="w-16 px-4 py-3 text-left text-sm font-semibold text-white/90">
                    S.No
                  </th>
                  <th className="w-40 px-4 py-3 text-left text-sm font-semibold text-white/90">
                    Name
                  </th>
                  <th className="w-44 px-4 py-3 text-left text-sm font-semibold text-white/90">
                    COMPOSIT ID
                  </th>
                  <th className="w-36 px-4 py-3 text-left text-sm font-semibold text-white/90">
                    Booking Period
                  </th>
                  <th className="w-36 px-4 py-3 text-left text-sm font-semibold text-white/90">
                    Contact
                  </th>
                  <th className="w-64 px-4 py-3 text-left text-sm font-semibold text-white/90">
                    Events
                  </th>
                  <th className="w-52 px-4 py-3 text-left text-sm font-semibold text-white/90">
                    Hall
                  </th>
                  <th className="w-28 px-4 py-3 text-left text-sm font-semibold text-white/90">
                    Screenshot
                  </th>
                  <th className="w-40 px-4 py-3 text-left text-sm font-semibold text-white/90">
                    Verification
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-4 py-6 text-center text-white/70"
                    >
                      No accommodation requests found
                    </td>
                  </tr>
                ) : (
                  items.map((a, index) => (
                    <tr
                      key={a._id}
                      className="border-b border-white/10 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-4 py-4 text-white/80 align-top">
                        {index + 1}
                      </td>
                      <td className="px-4 py-4 text-white font-semibold align-top truncate">
                        {a.name || "-"}
                      </td>
                      <td className="px-4 py-4 text-white/90 font-mono align-top truncate">
                        {a.compositId}
                      </td>
                      <td className="px-4 py-4 text-white/80 align-top">
                        {a.date}
                      </td>
                      <td className="px-4 py-4 text-white/80 align-top">
                        {a.phone}
                      </td>
                      <td className="px-4 py-4 text-white/80 align-top max-w-[16rem] whitespace-normal wrap-break-word leading-relaxed">
                        {a.events?.length ? a.events.join(", ") : "-"}
                      </td>
                      <td className="px-4 py-4 text-white/80 align-top">
                        <div className="flex items-center gap-2">
                          <select
                            value={hallSelections[a._id] || ""}
                            onChange={(e) =>
                              setHallSelections((prev) => ({
                                ...prev,
                                [a._id]: e.target.value,
                              }))
                            }
                            className="min-w-0 flex-1 rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-amber-400"
                            title={`Select hall for ${a.name || a.compositId}`}
                          >
                            <option value="">Not assigned</option>
                            {HALL_OPTIONS.map((hall) => (
                              <option key={hall} value={hall}>
                                {hall}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => saveHall(a._id)}
                            disabled={savingHallId === a._id}
                            className="shrink-0 inline-flex items-center justify-center rounded-lg border border-sky-400/25 bg-sky-400/10 px-3 py-2 text-xs font-medium text-sky-200 transition-all hover:bg-sky-400/20 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {savingHallId === a._id ? "Saving..." : "Save Hall"}
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-4 align-top">
                        {a.screenshot ? (
                          <a
                            href={a.screenshot}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1 rounded-lg bg-[#5c0a0a]/30 border border-[#5c0a0a]/50 text-white/90 hover:bg-[#5c0a0a]/50 transition-all"
                          >
                            View
                          </a>
                        ) : (
                          <span className="text-white/60">-</span>
                        )}
                      </td>
                      <td className="px-4 py-4 align-top">
                        {a.isApproved ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/15 text-green-300 border border-green-500/25">
                            Verified
                          </span>
                        ) : (
                          <button
                            onClick={() => approvePayment(a._id)}
                            disabled={approvingId === a._id}
                            className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-400/10 text-amber-300 border border-amber-400/25 hover:bg-amber-400/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {approvingId === a._id
                              ? "Approving..."
                              : "Approve Payment"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAccommodations;
