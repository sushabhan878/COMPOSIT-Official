"use client";

import { useEffect, useRef, useState } from "react";

const ManageParticipants = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const fetchUsers = async (pageNumber: number, search: string) => {
    setLoading(true);

    const params = new URLSearchParams({
      page: pageNumber.toString(),
      limit: "20",
    });

    if (search.trim()) {
      params.append("search", search);
    }

    const res = await fetch(`/api/admin/users?${params.toString()}`);
    const data = await res.json();

    setUsers(data.users);
    setTotalPages(data.pagination.totalPages);
    setTotalUsers(data.pagination.totalUsers ?? 0);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(page, searchTerm);
  }, [page, searchTerm]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  useEffect(() => {
    const handleDocClick = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!inputRef.current) return;
      if (target && inputRef.current.contains(target)) return;

      // allow any native focus to settle, then blur the input if it became active
      setTimeout(() => {
        if (document.activeElement === inputRef.current) {
          inputRef.current?.blur();
        }
      }, 0);
    };

    document.addEventListener("click", handleDocClick, true);
    return () => document.removeEventListener("click", handleDocClick, true);
  }, []);

  const handleNotify = (userId: string, email: string) => {
    console.log(`Notify user: ${userId}, ${email}`);
    // TODO: Implement notification logic
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
          Manage Participants
        </h1>

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <input
            ref={inputRef}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, COMPOSIT ID, or email"
            className="w-full md:w-96 px-4 py-2 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/50 focus:outline-none focus:border-[#5c0a0a] focus:ring-2 focus:ring-[#5c0a0a]/40 transition-all"
          />

          <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/15 text-white/80 text-sm">
            Total users:{" "}
            <span className="text-white font-semibold">{totalUsers}</span>
          </div>
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
                      COMPOSIT ID
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-white/90">
                      Joining Date
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-white/90">
                      Team/Events
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-white/90">
                      Accommodation
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-white/90">
                      Referred By
                    </th>
                    <th className="px-4 py-4 text-center text-sm font-semibold text-white/90">
                      Certificate
                    </th>
                    <th className="px-4 py-4 text-center text-sm font-semibold text-white/90">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td
                        colSpan={9}
                        className="px-4 py-8 text-center text-white/70"
                      >
                        No participants found
                      </td>
                    </tr>
                  ) : (
                    users.map((user: any) => (
                      <tr
                        key={user._id}
                        className="border-b border-white/10 hover:bg-white/5 transition-colors"
                      >
                        <td className="px-4 py-4 text-base text-white font-semibold min-w-[220px]">
                          {user.name}
                        </td>
                        <td className="px-4 py-4 text-sm text-white/80">
                          {user.email}
                        </td>
                        <td className="px-4 py-4 text-sm text-white/90 font-mono">
                          {user.compositId || "N/A"}
                        </td>
                        <td className="px-4 py-4 text-sm text-white/80">
                          {formatDate(user.joinDate)}
                        </td>
                        <td className="px-4 py-4 text-sm text-white/80">
                          {user.team?.name || user.registeredEvents?.length > 0
                            ? `${user.registeredEvents?.length || 0} event(s)`
                            : "N/A"}
                        </td>
                        <td className="px-4 py-4 text-sm text-white/80 space-y-1">
                          {user?.accommodation?.taken ? (
                            <>
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/15 text-green-300 border border-green-500/25">
                                Taken
                              </span>
                              <div className="text-white/70 text-xs">
                                Hall: {user?.accommodation?.hallName || "-"}
                              </div>
                            </>
                          ) : (
                            <div className="text-white/60 text-sm">
                              Not taken
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-4 text-sm text-white/80">
                          {user.referredBy || "Direct"}
                        </td>
                        <td className="px-4 py-4 text-center">
                          {user.cirtificateGenerated ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                              ✓ Generated
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-400 border border-gray-500/30">
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <button
                            onClick={() => handleNotify(user._id, user.email)}
                            className="px-4 py-1.5 text-sm rounded-lg bg-[#5c0a0a]/30 border border-[#5c0a0a]/50 text-white/90 hover:bg-[#5c0a0a]/50 hover:border-[#5c0a0a] transition-all duration-200"
                          >
                            Notify
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
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/15 text-white/90 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-all"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/15 text-white/90 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-all"
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

export default ManageParticipants;
