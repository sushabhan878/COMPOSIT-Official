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
  hallName?: string | null;
  isApproved?: boolean;
};

const ManageAccommodations = () => {
  const [items, setItems] = useState<Accom[]>([]);
  const [loading, setLoading] = useState(false);
  const [approvingId, setApprovingId] = useState<string | null>(null);

  const fetchAccommodations = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/accommodation");
      const data = await res.json();
      setItems(data.accommodations || []);
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
        body: JSON.stringify({ accommodationId }),
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

  useEffect(() => {
    fetchAccommodations();
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
            <table className="w-full">
              <thead className="bg-white/10 border-b border-white/15">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white/90">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white/90">
                    COMPOSIT ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white/90">
                    Booking Period
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white/90">
                    Contact
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white/90">
                    Hall
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white/90">
                    Screenshot
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white/90">
                    Verification
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-6 text-center text-white/70"
                    >
                      No accommodation requests found
                    </td>
                  </tr>
                ) : (
                  items.map((a) => (
                    <tr
                      key={a._id}
                      className="border-b border-white/10 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-4 py-4 text-white font-semibold">
                        {a.name || "-"}
                      </td>
                      <td className="px-4 py-4 text-white/90 font-mono">
                        {a.compositId}
                      </td>
                      <td className="px-4 py-4 text-white/80">{a.date}</td>
                      <td className="px-4 py-4 text-white/80">{a.phone}</td>
                      <td className="px-4 py-4 text-white/80">
                        {a.hallName || "-"}
                      </td>
                      <td className="px-4 py-4">
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
                      <td className="px-4 py-4">
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
