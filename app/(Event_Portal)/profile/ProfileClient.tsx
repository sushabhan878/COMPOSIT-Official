"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import GridBackground from "@/components/GridBackground";
import { Mail, LogOut, Users, Trophy, ChevronDown } from "lucide-react";
import Image from "next/image";
import { signOut } from "next-auth/react";

type EventItem = { id: string; name: string };
type TeamData = {
  teamName: string;
  teamId: string;
  event: string;
  members: { name: string; compositId: string }[];
};
type UserInfo = {
  name?: string;
  email?: string;
  image?: string;
  compositId?: string;
};

const riseProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

export default function ProfileClient({
  user,
  events,
  teams,
}: {
  user: UserInfo;
  events: EventItem[];
  teams: TeamData[];
}) {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const selectedEventData = selectedEvent
    ? events.find((e) => e.id === selectedEvent)
    : null;

  // Find the team for the selected event
  const selectedTeam = selectedEvent
    ? teams.find((t) => t.event === selectedEvent)
    : null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-dvh py-20 px-6 mt-20">
      <GridBackground />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div {...riseProps} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-white/60">
            View and manage your event participation information
          </p>
        </motion.div>

        {/* Main Profile Card */}
        <motion.div
          {...riseProps}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1] as const,
            delay: 0.1,
          }}
          className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-8 shadow-2xl mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile Image Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="relative mb-6">
                {/* Glowing border effect */}
                <div className="absolute -inset-2 rounded-full bg-linear-to-r from-[#7a1f2a] via-[#2d4f9e] to-[#7a1f2a] opacity-40 blur-lg animate-pulse"></div>

                {user?.image ? (
                  <Image
                    src={user.image}
                    alt={user?.name || "Profile Image"}
                    width={200}
                    height={200}
                    className="relative w-48 h-48 rounded-full object-cover border-2 border-white/20 shadow-2xl"
                  />
                ) : (
                  <div className="relative w-48 h-48 rounded-full bg-linear-to-br from-[#7a1f2a] via-black to-[#2d4f9e] border-2 border-white/20 shadow-2xl flex items-center justify-center">
                    <span className="text-7xl font-bold text-white">
                      {user?.name?.charAt(0).toUpperCase() || "?"}
                    </span>
                  </div>
                )}
              </div>

              <h2 className="text-2xl font-bold text-white text-center mb-2 break-words px-4">
                {user?.name || "User"}
              </h2>
              <p className="text-white/60 text-center mb-6">
                {events.length > 0
                  ? "Event Participant"
                  : "Not registered for any events yet"}
              </p>

              <motion.button
                onClick={() => signOut({ callbackUrl: "/signin" })}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="relative overflow-hidden px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 group"
              >
                {/* Gradient background */}
                <div className="absolute inset-0 bg-linear-to-r from-[#7a1f2a] via-[#2d4f9e] to-[#7a1f2a] opacity-100 group-hover:opacity-90"></div>

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />

                {/* Glow effect on hover */}
                <div className="absolute -inset-1 rounded-lg bg-linear-to-r from-[#7a1f2a] to-[#2d4f9e] opacity-0 group-hover:opacity-50 blur-lg transition-all duration-300 -z-10"></div>

                {/* Button content */}
                <div className="relative flex items-center justify-center gap-2">
                  <motion.div
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <LogOut className="w-5 h-5" />
                  </motion.div>
                  <span>Logout</span>
                </div>
              </motion.button>
            </motion.div>

            {/* Details Grid */}
            <div className="md:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  whileHover={{
                    y: -4,
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                  }}
                  className="rounded-lg border border-white/10 bg-white/5 p-4 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 mt-1 shrink-0 text-purple-400" />
                    <div className="min-w-0 flex-1">
                      <p className="text-white/50 text-sm mb-1">Name</p>
                      <p className="text-white font-medium break-words">
                        {user?.name || "N/A"}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{
                    y: -4,
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                  }}
                  className="rounded-lg border border-white/10 bg-white/5 p-4 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 mt-1 shrink-0 text-blue-400" />
                    <div className="min-w-0 flex-1">
                      <p className="text-white/50 text-sm mb-1">Email</p>
                      <p className="text-white font-medium break-words leading-relaxed">
                        {user?.email || "N/A"}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Events Registered */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  whileHover={{
                    y: -4,
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                  }}
                  className="rounded-lg border border-white/10 bg-white/5 p-4 transition-all duration-300 sm:col-span-2"
                >
                  <div className="flex items-start gap-3">
                    <Trophy className="w-5 h-5 mt-1 shrink-0 text-yellow-400" />
                    <div className="w-full">
                      <p className="text-white/50 text-sm mb-2">
                        Events Registered
                      </p>
                      <p className="text-white font-medium mb-3">
                        {events.length} events
                      </p>

                      {/* Event Dropdown */}
                      <div className="relative">
                        <button
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white text-sm flex items-center justify-between hover:bg-black/70 transition-colors"
                        >
                          <span className="truncate">
                            {selectedEventData?.name || "Select an event"}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              isDropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 right-0 mt-2 bg-black/80 border border-white/10 rounded-lg overflow-hidden z-10 backdrop-blur-sm"
                          >
                            {events.map((event) => (
                              <button
                                key={event.id}
                                onClick={() => {
                                  setSelectedEvent(event.id);
                                  setIsDropdownOpen(false);
                                }}
                                className="w-full px-3 py-2 text-left text-white text-sm hover:bg-white/10 transition-colors"
                              >
                                {event.name}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Team Information Section - Shows when event is selected */}
        {selectedEventData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1] as const,
              delay: 0.15,
            }}
            className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-8 shadow-2xl mb-8"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
              Team Information for {selectedEventData.name}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Team Name */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-lg border border-white/10 bg-white/5 p-6"
              >
                <p className="text-white/60 text-sm mb-3 font-semibold">
                  Team Name
                </p>
                <p className="text-white font-medium text-lg break-words">
                  {selectedTeam?.teamName || "N/A"}
                </p>
                <p className="text-white/50 text-xs mt-2">
                  You are part of this team for the event
                </p>
              </motion.div>

              {/* Team ID */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.23 }}
                className="rounded-lg border border-white/10 bg-white/5 p-6"
              >
                <p className="text-white/60 text-sm mb-3 font-semibold">
                  Team ID
                </p>
                <p className="text-white font-medium text-lg break-words">
                  {selectedTeam?.teamId || "N/A"}
                </p>
                <p className="text-white/50 text-xs mt-2">
                  Use this ID to invite members
                </p>
              </motion.div>

              {/* Team Members Count */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="rounded-lg border border-white/10 bg-white/5 p-6"
              >
                <p className="text-white/60 text-sm mb-3 font-semibold">
                  Team Size
                </p>
                <p className="text-white font-medium text-lg">
                  {selectedTeam?.members?.length || 0} members
                </p>
                <p className="text-white/50 text-xs mt-2">Total team members</p>
              </motion.div>

              {/* Team Members */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="rounded-lg border border-white/10 bg-white/5 p-6 md:col-span-3"
              >
                <p className="text-white/60 text-sm mb-4 font-semibold flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Team Members
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(selectedTeam?.members || []).map((member, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.35 + idx * 0.05 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-black/40 border border-white/10"
                    >
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#7a1f2a] to-[#2d4f9e] flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">
                          {member.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-white text-sm font-medium break-words leading-snug">
                        {member.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Quick Stats Section */}
        <motion.div
          {...riseProps}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1] as const,
            delay: 0.3,
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            whileHover={{ y: -4 }}
            className="rounded-xl border border-white/10 bg-linear-to-br from-[#7a1f2a] to-black/20 p-6 text-center shadow-lg"
          >
            <p className="text-white/60 text-sm mb-2">
              Total Events You Registered
            </p>
            <p className="text-3xl font-bold text-white">{events.length}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -4 }}
            className="rounded-xl border border-white/10 bg-linear-to-br from-[#2d4f9e] to-black/20 p-6 text-center shadow-lg"
          >
            <p className="text-white/60 text-sm mb-2">Composit ID </p>
            <p className="text-3xl font-bold text-white break-words">
              {user.compositId || "N/A"}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
