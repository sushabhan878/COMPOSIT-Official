"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import GridBackground from '@/components/GridBackground'
import { Mail, Phone, MapPin, GraduationCap, Building2, Code2, LogOut, User, Users, Copy, Check } from 'lucide-react'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'

const riseProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
}

const Profile = () => {
  //  SA Data will be fetched from the session 
  const session = useSession()
  const saData = session.data?.user as any

  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // const detailsSection = [
  //   {
  //     icon: Mail,
  //     label: "Email",
  //     value: saData.email,
  //     color: "text-blue-400"
  //   },
  //   {
  //     icon: Phone,
  //     label: "Phone",
  //     value: saData.phone,
  //     color: "text-green-400"
  //   },
  //   {
  //     icon: MapPin,
  //     label: "Location",
  //     value: `${saData.city}, ${saData.state}`,
  //     color: "text-red-400"
  //   },
  //   {
  //     icon: GraduationCap,
  //     label: "College",
  //     value: saData.collegeName,
  //     color: "text-purple-400"
  //   },
  //   {
  //     icon: Building2,
  //     label: "Department",
  //     value: saData.department,
  //     color: "text-yellow-400"
  //   },
  //   {
  //     icon: Code2,
  //     label: "Roll Number",
  //     value: saData.collegeId,
  //     color: "text-cyan-400"
  //   }
  // ]

  return (
    <div className="relative min-h-dvh py-20 px-6 mt-20">
      <GridBackground />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          {...riseProps}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-white/60">View and manage your Student Ambassador information</p>
        </motion.div>

        {/* Main Profile Card */}
        <motion.div
          {...riseProps}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 }}
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
                
                {saData?.image ? (
                  <Image
                    src={saData.image}
                    alt={saData?.name || 'Profile Image'}
                    width={200}
                    height={200}
                    className="relative w-48 h-48 rounded-full object-cover border-2 border-white/20 shadow-2xl"
                  />
                ) : (
                  <div className="relative w-48 h-48 rounded-full bg-linear-to-br from-[#7a1f2a] via-black to-[#2d4f9e] border-2 border-white/20 shadow-2xl flex items-center justify-center">
                    <span className="text-7xl font-bold text-white">
                      {saData?.name?.charAt(0).toUpperCase() || "?"}
                    </span>
                  </div>
                )}
              </div>

              <h2 className="text-2xl font-bold text-white text-center mb-2">{saData?.name}</h2>
              <p className="text-white/60 text-center mb-4">Student Ambassador</p>
              
              <motion.button
                onClick={() => signOut({ callbackUrl: '/ca/signin-sa' })}
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
                <div className="relative flex items-center justify-center gap-2"
                  onClick={() => signOut({ callbackUrl: '/ca/signin-sa' })}
                >
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
                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  whileHover={{ y: -4, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  className="rounded-lg border border-white/10 bg-white/5 p-4 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 mt-1 shrink-0 text-blue-400" />
                    <div>
                      <p className="text-white/50 text-sm mb-1">Email</p>
                      <p className="text-white font-medium">{saData?.email || "N/A"}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.20 }}
                  whileHover={{ y: -4, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  className="rounded-lg border border-white/10 bg-white/5 p-4 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 mt-1 shrink-0 text-green-400" />
                    <div>
                      <p className="text-white/50 text-sm mb-1">Phone</p>
                      <p className="text-white font-medium">{saData?.mobile || "N/A"}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Location */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  whileHover={{ y: -4, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  className="rounded-lg border border-white/10 bg-white/5 p-4 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 mt-1 shrink-0 text-red-400" />
                    <div>
                      <p className="text-white/50 text-sm mb-1">Location</p>
                      <p className="text-white font-medium">{saData?.city && saData?.state ? `${saData.city}, ${saData.state}` : "N/A"}</p>
                    </div>
                  </div>
                </motion.div>

                {/* College */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.30 }}
                  whileHover={{ y: -4, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  className="rounded-lg border border-white/10 bg-white/5 p-4 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 mt-1 shrink-0 text-purple-400" />
                    <div>
                      <p className="text-white/50 text-sm mb-1">College</p>
                      <p className="text-white font-medium">{saData?.collegeName || "N/A"}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Department */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  whileHover={{ y: -4, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  className="rounded-lg border border-white/10 bg-white/5 p-4 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 mt-1 shrink-0 text-yellow-400" />
                    <div>
                      <p className="text-white/50 text-sm mb-1">Department</p>
                      <p className="text-white font-medium">{saData?.department || "N/A"}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Roll Number */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.40 }}
                  whileHover={{ y: -4, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  className="rounded-lg border border-white/10 bg-white/5 p-4 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <Code2 className="w-5 h-5 mt-1 shrink-0 text-cyan-400" />
                    <div>
                      <p className="text-white/50 text-sm mb-1">Roll Number</p>
                      <p className="text-white font-medium">{saData?.collegeId || "N/A"}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Info Section */}
        <motion.div
          {...riseProps}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 }}
          className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-8 shadow-2xl mb-8"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Additional Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Gender */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="rounded-lg border border-white/10 bg-white/5 p-4"
            >
              <p className="text-white/50 text-sm mb-2">Gender</p>
              <p className="text-white font-medium text-lg capitalize">{saData?.gender || "N/A"}</p>
            </motion.div>

            {/* Joined Date */}
            <motion.div
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="rounded-lg border border-white/10 bg-white/5 p-4"
            >
              <p className="text-white/50 text-sm mb-2">Joined Date</p>
              <p className="text-white font-medium text-lg">
                {saData?.joinedDate ? new Date(saData.joinedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : "N/A"}
              </p>
            </motion.div>

            {/* SA ID */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="rounded-lg border border-white/10 bg-white/5 p-4"
            >
              <p className="text-white/50 text-sm mb-2">SA ID</p>
              <p className="text-white font-medium text-lg font-mono">{saData?.saId || "N/A"}</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Referral & QR Section */}
        <motion.div
          {...riseProps}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.25 }}
          className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-8 shadow-2xl mb-8"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Referral & QR Code</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Referral Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-lg border border-white/10 bg-white/5 p-6"
            >
              <p className="text-white/60 text-sm mb-4 font-semibold">Your Referral Link</p>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  readOnly
                  placeholder="Referral link"
                  value={saData?.referralLink || "link not available"}
                  className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm truncate"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => saData?.referralLink && copyToClipboard(saData.referralLink)}
                  className="px-4 py-2 rounded-lg bg-linear-to-r from-[#7a1f2a] to-[#2d4f9e] text-white hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy"}
                </motion.button>
              </div>
              <p className="text-white/50 text-xs">Share this link to invite other students to join as SA</p>
            </motion.div>

            {/* QR Code */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="rounded-lg border border-white/10 bg-white/5 p-6 flex flex-col items-center justify-center"
            >
              <p className="text-white/60 text-sm mb-4 font-semibold">Scan to Share</p>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white p-3 rounded-lg"
              >
                <Image
                  src={saData?.qrCode || "/default-qr.png"}
                  alt="Referral QR Code"
                  width={150}
                  height={150}
                  className="w-40 h-40 object-contain"
                />
              </motion.div>
              <p className="text-white/50 text-xs mt-4 text-center">Scan with your phone to share referral</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          {...riseProps}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { label: "Events Registered", value: saData?.eventsRegistered || "0", color: "from-[#7a1f2a]" },
            { label: "Number of Students you Referred", value: saData?.referralsCount || "0", color: "from-[#2d4f9e]" },
            { label: "Rank", value: saData?.rank ? `#${saData.rank}` : "N/A", color: "from-green-600" }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 + idx * 0.05 }}
              whileHover={{ y: -4 }}
              className={`rounded-xl border border-white/10 bg-linear-to-br ${stat.color} to-black/20 p-6 text-center shadow-lg`}
            >
              <p className="text-white/60 text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default Profile
