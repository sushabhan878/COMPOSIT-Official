"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import GridBackground from "@/components/GridBackground";
import { Crown, Copy, Check, Users, Star, Target } from "lucide-react";
import Image from "next/image";

const riseProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

type LeaderboardUser = {
  rank: number;
  name: string;
  email?: string;
  college?: string;
  city?: string;
  referrals: number;
  avatar?: string;
  compositId?: string;
  referralLink?: string;
  referralQrLink?: string;
  role?: string;
  qrLink?: string;
  qrImage?: string;
};

const Leaderboard = () => {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [topAmbassadors, setTopAmbassadors] = useState<LeaderboardUser[]>([]);
  const [yourData, setYourData] = useState<LeaderboardUser | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/leaderboard", { method: "GET" });

        if (!res.ok) {
          throw new Error("Unable to load leaderboard data");
        }

        const data = await res.json();
        setTopAmbassadors(data.topAmbassadors || []);
        setYourData(data.currentUser || null);
      } catch (err) {
        setError("Failed to fetch leaderboard. Please refresh.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const yourPoints = useMemo(() => {
    if (!yourData) return 0;
    return (yourData.referrals || 0) * 25;
  }, [yourData]);

  const handleCopy = () => {
    if (!yourData?.qrLink) return;
    navigator.clipboard.writeText(yourData.qrLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="relative min-h-dvh px-6 py-16 mt-20">
        <GridBackground />
        <div className="max-w-6xl mx-auto text-center text-white/70">
          Loading leaderboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative min-h-dvh px-6 py-16 mt-20">
        <GridBackground />
        <div className="max-w-6xl mx-auto text-center text-red-300">
          {error}
        </div>
      </div>
    );
  }

  if (!yourData) {
    return (
      <div className="relative min-h-dvh px-6 py-16 mt-20">
        <GridBackground />
        <div className="max-w-6xl mx-auto text-center text-white/70">
          Your leaderboard data is unavailable.
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-dvh px-6 py-16 mt-20">
      <GridBackground />

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <motion.div {...riseProps} className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-white/50 mb-3">
            Leaderboard
          </p>
          <h1 className="text-4xl font-bold text-white mb-3">
            Top Student Ambassadors
          </h1>
          <p className="text-white/60">
            Celebrate the leading SAs across India and track your own progress.
          </p>
        </motion.div>

        {/* Top 5 Section */}
        <motion.div
          {...riseProps}
          transition={{ ...riseProps.transition, delay: 0.1 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3">
            <Crown className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-semibold text-white">
              Top 5 SAs Across India
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topAmbassadors.map((sa, idx) => (
              <motion.div
                key={sa.rank}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.12 + idx * 0.05,
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
                whileHover={{ y: -6, borderColor: "rgba(255,255,255,0.25)" }}
                className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 shadow-xl"
              >
                <div className="absolute -top-3 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-linear-to-r from-[#7a1f2a] via-black to-[#2d4f9e] text-xs font-semibold text-white shadow-lg">
                  #{sa.rank}{" "}
                  {sa.rank === 1
                    ? "Champion"
                    : sa.rank === 2
                      ? "Elite"
                      : sa.rank === 3
                        ? "Pro"
                        : "Rising"}
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border border-white/15">
                    <Image
                      src="/usericon.webp"
                      alt={sa.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold text-lg">
                      {sa.name}
                    </p>
                    <p className="text-white/60 text-sm">
                      {sa.college} • {sa.city}
                    </p>
                    <p className="text-white/40 text-xs">{sa.email}</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white/80">
                    <p className="text-white/50 text-xs">Referrals</p>
                    <p className="text-lg font-bold text-white">
                      {sa.referrals}
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white/80">
                    <p className="text-white/50 text-xs">Composit ID</p>
                    <p className="text-sm font-semibold text-white truncate">
                      {sa.compositId || "N/A"}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Your Position */}
        <motion.div
          {...riseProps}
          transition={{ ...riseProps.transition, delay: 0.2 }}
          className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-8 shadow-2xl"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.2em] text-white/50">
                Your Position
              </p>
              <div className="flex items-center gap-3">
                <div className="rounded-full px-4 py-2 bg-white/10 text-white font-semibold">
                  Rank #{yourData.rank}
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <Users className="w-4 h-4" />
                  <span>{yourData.referrals} referrals</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{yourData.name}</p>
              <p className="text-sm text-white/60">{yourData.email}</p>
              <div className="flex items-center gap-4 text-white/70 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>{yourPoints} points</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:w-1/2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <p className="text-white/50 text-xs mb-1">
                  Referrals Registered
                </p>
                <p className="text-3xl font-bold text-white">
                  {yourData.referrals}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <p className="text-white/50 text-xs mb-1">Points Earned</p>
                <p className="text-3xl font-bold text-white">{yourPoints}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Referral QR & Stats */}
        <motion.div
          {...riseProps}
          transition={{ ...riseProps.transition, delay: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* QR & Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1] as const,
              delay: 0.3,
            }}
            className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-6 shadow-xl"
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              Your Referral Link
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 space-y-3">
                <p className="text-white/70 text-sm">
                  Share this link to invite new participants.
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    placeholder="Referral link"
                    value={yourData.qrLink || "Referral link unavailable"}
                    className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm truncate"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopy}
                    className="px-4 py-2 rounded-lg bg-linear-to-r from-[#7a1f2a] to-[#2d4f9e] text-white hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {copied ? "Copied!" : "Copy"}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1] as const,
              delay: 0.35,
            }}
            className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-6 shadow-xl"
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Stats
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  label: "Total Referrals",
                  value: yourData.referrals,
                  icon: Users,
                  accent: "text-blue-400",
                },
                {
                  label: "Points Earned",
                  value: yourPoints,
                  icon: Star,
                  accent: "text-yellow-400",
                },
                {
                  label: "Goal",
                  value: "1000 pts",
                  icon: Target,
                  accent: "text-emerald-400",
                },
                {
                  label: "Next Milestone",
                  value: "Rank Top 10",
                  icon: Crown,
                  accent: "text-purple-300",
                },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.2)" }}
                    transition={{ duration: 0.25 }}
                    className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-center gap-3"
                  >
                    <div
                      className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center ${stat.accent}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs uppercase tracking-wide">
                        {stat.label}
                      </p>
                      <p className="text-white font-semibold text-lg">
                        {stat.value}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;

// import React from 'react'
// import ComingSoon from '@/components/ComingSoon'

// const Leaderboard = () => {
//   return <ComingSoon />
// }

// export default Leaderboard
