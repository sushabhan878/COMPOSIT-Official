"use client";

import { useEffect, useRef, useState } from "react";

type Team = {
  teamName: string;
  teamId: string;
  event: string;
  leader: { name: string | null; compositId: string };
  members: { name: string; compositId: string }[];
  createdAt?: string;
};

const ManageEvents = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTeams, setTotalTeams] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const fetchTeams = async (pageNumber: number, search: string) => {
    setLoading(true);

    const params = new URLSearchParams({
      page: pageNumber.toString(),
      limit: "20",
    });

    if (search.trim()) {
      params.append("search", search);
    }

    const res = await fetch(`/api/admin/events?${params.toString()}`);
    const data = await res.json();

    setTeams(data.teams ?? []);
    setTotalPages(data.pagination?.totalPages ?? 1);
    setTotalTeams(data.pagination?.totalTeams ?? 0);
    setLoading(false);
  };

  useEffect(() => {
    fetchTeams(page, searchTerm);
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

  const formatDate = (date?: string) => {
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
        <h1 className="text-4xl font-bold text-white mb-6">Manage Teams</h1>

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <input
            ref={inputRef}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by team name, ID, event, leader or member"
            className="w-full md:w-96 px-4 py-2 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/50 focus:outline-none focus:border-[#5c0a0a] focus:ring-2 focus:ring-[#5c0a0a]/40 transition-all"
          />

          <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/15 text-white/80 text-sm">
            Total teams:{" "}
            <span className="text-white font-semibold">{totalTeams}</span>
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
                    <th className="px-4 py-4 text-left text-sm font-semibold text-white/90 min-w-[200px]">
                      Team Name
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-white/90">
                      Team ID
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-white/90">
                      Event
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-white/90 min-w-[220px]">
                      Leader (Name / ID)
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-white/90 min-w-[300px]">
                      Members (Name / ID)
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-white/90">
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teams.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-8 text-center text-white/70"
                      >
                        No teams found
                      </td>
                    </tr>
                  ) : (
                    teams.map((team) => (
                      <tr
                        key={team.teamId}
                        className="border-b border-white/10 hover:bg-white/5 transition-colors"
                      >
                        <td className="px-4 py-4 text-base text-white font-semibold min-w-[200px]">
                          {team.teamName}
                        </td>
                        <td className="px-4 py-4 text-sm text-white/90 font-mono">
                          {team.teamId}
                        </td>
                        <td className="px-4 py-4 text-sm text-white/80">
                          {team.event}
                        </td>
                        <td className="px-4 py-4 text-sm text-white/80">
                          <div className="flex flex-col">
                            <span className="text-white">
                              {team.leader?.name ?? "Unknown"}
                            </span>
                            <span className="font-mono text-white/70">
                              {team.leader?.compositId}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-white/80">
                          <div className="flex flex-col gap-1">
                            {team.members?.length ? (
                              team.members.map((m, idx) => (
                                <div
                                  key={`${team.teamId}-m-${idx}`}
                                  className="flex items-center gap-2"
                                >
                                  <span className="text-white">{m.name}</span>
                                  <span className="font-mono text-white/70">
                                    {m.compositId}
                                  </span>
                                </div>
                              ))
                            ) : (
                              <span className="text-white/60">No members</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-white/80">
                          {formatDate(team.createdAt)}
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

export default ManageEvents;
