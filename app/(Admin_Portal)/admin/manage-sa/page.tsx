"use client";

import { useEffect, useRef, useState } from "react";

const ManageSAs = () => {
  const [sas, setSAs] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const fetchSAs = async (pageNumber: number, search: string) => {
    setLoading(true);

    const params = new URLSearchParams({
      page: pageNumber.toString(),
      limit: "20",
    });

    if (search.trim()) {
      params.append("search", search);
    }

    const res = await fetch(`/api/admin/sa?${params.toString()}`);
    const data = await res.json();

    setSAs(data.sas || []);
    setTotalPages(data.pagination.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    fetchSAs(page, searchTerm);
  }, [page, searchTerm]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  useEffect(() => {
    const handleDocClick = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!inputRef.current) return;
      if (target && inputRef.current.contains(target)) return;

      setTimeout(() => {
        if (document.activeElement === inputRef.current) {
          inputRef.current?.blur();
        }
      }, 0);
    };

    document.addEventListener("click", handleDocClick, true);
    return () => document.removeEventListener("click", handleDocClick, true);
  }, []);

  const handleNotify = (saId: string, email: string) => {
    console.log(`Notify SA: ${saId}, ${email}`);
    // TODO: call notify API
  };

  const getRankClasses = (rank?: string) => {
    const normalized = (rank || "").toLowerCase();
    const styles: Record<string, string> = {
      bronze:
        "bg-amber-800/30 text-amber-200 border border-amber-500/40 shadow-[0_0_0_1px_rgba(217,119,6,0.2)]",
      silver:
        "bg-slate-500/25 text-slate-100 border border-slate-200/40 shadow-[0_0_0_1px_rgba(226,232,240,0.2)]",
      gold: "bg-yellow-500/25 text-yellow-100 border border-yellow-400/50 shadow-[0_0_0_1px_rgba(250,204,21,0.25)]",
      platinum:
        "bg-sky-200/25 text-sky-50 border border-sky-100/60 shadow-[0_0_0_1px_rgba(186,230,253,0.35)]",
    };

    return (
      styles[normalized] ||
      "bg-blue-500/20 text-blue-200 border border-blue-500/30"
    );
  };

  const formatDate = (date: string) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="mt-34 p-8">
      <div className="w-full max-w-screen-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6">
          Manage Student Ambassadors
        </h1>

        <div className="mb-4 flex items-center gap-3">
          <input
            ref={inputRef}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, SA ID, or email"
            className="w-full md:w-96 px-4 py-2 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/50 focus:outline-none focus:border-[#5c0a0a] focus:ring-2 focus:ring-[#5c0a0a]/40 transition-all"
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-white text-xl">Loading...</div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto backdrop-blur-xl bg-white/5 border border-white/15 rounded-2xl shadow-[0_20px_60px_rgba(92,10,10,0.35)]">
              <table className="w-full">
                <thead className="bg-white/10 border-b border-white/15">
                  <tr>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-white/90 min-w-[220px]">
                      Name
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-white/90">
                      Email
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-white/90">
                      Contact
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-white/90">
                      SA ID
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-white/90">
                      Joining Date
                    </th>
                    <th className="px-4 py-4 text-center text-sm font-semibold text-white/90">
                      Referrals
                    </th>
                    <th className="px-4 py-4 text-center text-sm font-semibold text-white/90">
                      Rank
                    </th>
                    <th className="px-4 py-4 text-center text-sm font-semibold text-white/90">
                      Certificate
                    </th>
                    <th className="px-4 py-4 text-center text-sm font-semibold text-white/90">
                      Notify
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {sas.length === 0 ? (
                    <tr>
                      <td
                        colSpan={9}
                        className="px-4 py-8 text-center text-white/70"
                      >
                        No SAs found
                      </td>
                    </tr>
                  ) : (
                    sas.map((sa: any) => (
                      <tr
                        key={sa._id}
                        className="border-b border-white/10 hover:bg-white/5 transition-colors"
                      >
                        <td className="px-4 py-4 text-base text-white font-semibold">
                          {sa.name}
                        </td>
                        <td className="px-4 py-4 text-sm text-white/80">
                          {sa.email}
                        </td>
                        <td className="px-4 py-4 text-sm text-white/80 font-mono">
                          {sa.mobile || "N/A"}
                        </td>
                        <td className="px-4 py-4 text-sm text-white/90 font-mono">
                          {sa.saId}
                        </td>
                        <td className="px-4 py-4 text-sm text-white/80">
                          {formatDate(sa.joiningDate)}
                        </td>
                        <td className="px-4 py-4 text-center text-white font-semibold">
                          {sa.referralsCount}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span
                            className={`inline-flex px-2.5 py-1 text-xs rounded-full font-semibold uppercase tracking-wide ${getRankClasses(
                              sa.SARank
                            )}`}
                          >
                            {sa.SARank || "N/A"}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          {sa.certificateIssued ? (
                            <span className="inline-flex px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                              ✓ Issued
                            </span>
                          ) : (
                            <span className="inline-flex px-2 py-1 text-xs rounded-full bg-gray-500/20 text-gray-400 border border-gray-500/30">
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <button
                            onClick={() => handleNotify(sa._id, sa.email)}
                            className="px-4 py-1.5 text-sm rounded-lg bg-[#5c0a0a]/30 border border-[#5c0a0a]/50 text-white/90 hover:bg-[#5c0a0a]/50 hover:border-[#5c0a0a] transition-all"
                          >
                            Notify ({sa.notifyCount || 0})
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-between">
              <div className="text-white/70 text-sm">
                Page {page} of {totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/15 text-white/90 disabled:opacity-50 hover:bg-white/10"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/15 text-white/90 disabled:opacity-50 hover:bg-white/10"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageSAs;
