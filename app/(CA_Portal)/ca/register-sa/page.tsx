"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import GridBackground from "@/components/GridBackground"
import { signIn } from "next-auth/react"
import { Eye, EyeOff } from "lucide-react"
import axios from "axios"

const INDIAN_STATES = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
]

const riseProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
}

const RegisterSA: React.FC = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    collegeName: "",
    collegeId: "",
    department: "",
    city: "",
    state: "",
    password: ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Please enter your name.")
      return false
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address.")
      return false
    }
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile)) {
      setError("Please enter a valid 10-digit phone number.")
      return false
    }
    if (!formData.gender) {
      setError("Please select your gender.")
      return false
    }
    if (!formData.collegeName.trim()) {
      setError("Please enter your college name.")
      return false
    }
    if (!formData.collegeId.trim()) {
      setError("Please enter your college ID/Roll number.")
      return false
    }
    if (!formData.department.trim()) {
      setError("Please enter your department.")
      return false
    }
    if (!formData.city.trim()) {
      setError("Please enter your city.")
      return false
    }
    if (!formData.state) {
      setError("Please select your state.")
      return false
    }
    if (!formData.password.trim() || formData.password.length < 6) {
      setError("Password must be at least 6 characters.")
      return false
    }
    return true
  }

  // function generateSAId() {
  //   const prefix = "SA-2026-";
  //   const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  //   let randomPart = "";

  //   for (let i = 0; i < 4; i++) {
  //     randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  //   }

  //   const SaId = prefix + randomPart;
  //   return SaId;
  // }


  // function generateReferralLink(SaId: string) {
  //   const baseUrl = "http://localhost:3000/signup";
  //   return `${baseUrl}?ref=${SaId}`;
  // }
  
  // function generateReferralQrLink(referralLink: string) {
  //   const baseUrl = "https://api.qrserver.com/v1/create-qr-code/";
  //   return `${baseUrl}?data=${encodeURIComponent(referralLink)}&size=200x200`;
  // }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!validateForm()) {
      return
    }

    try {
      setLoading(true)
      // TODO: Update this endpoint to your specific SA registration endpoint
      const res = await axios.post("/api/auth/signup-sa", {
        ...formData,
        // role: "sa",
        // joinDate: new Date(),
        // numberOfReferrals: 0,
        // SARank: null,
      })

      if (res.status !== 200) {
        throw new Error(res.data?.message || "Registration failed")
      }

      setSuccess("Account created successfully! Redirecting...")
      await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: true,
        callbackUrl: "/ca"
      })
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-dvh flex items-center justify-center px-6 py-10 mt-28">
      <GridBackground />

      <div className="w-full max-w-2xl">
        <motion.div {...riseProps} className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-wide text-white/90">Register as Student Ambassador</h1>
          <p className="mt-2 text-sm text-white/60">Join our SA program and be a part of COMPOSIT community.</p>
        </motion.div>

        <motion.div
          {...riseProps}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 }}
          className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-6 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name and Email - Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.12 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-sm text-white/70 mb-1">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full rounded-lg border border-white/10 bg-black/60 px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-red-700/60 transition-all duration-200 hover:bg-black/75"
                />
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-white/10 bg-black/60 px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-red-700/60 transition-all duration-200 hover:bg-black/75"
                />
              </div>
            </motion.div>

            {/* Phone and Gender - Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.14 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-sm text-white/70 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="10-digit phone number"
                  maxLength={10}
                  className="w-full rounded-lg border border-white/10 bg-black/60 px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-red-700/60 transition-all duration-200 hover:bg-black/75"
                />
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-1">Gender *</label>
                <select
                  aria-label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-black/60 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-700/60 [&>option]:bg-black [&>option]:text-white [&>option]:py-2 transition-all duration-200 hover:bg-black/75"
                >
                  <option value="" className="text-white/40">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </motion.div>

            {/* College Name and College ID - Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.16 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-sm text-white/70 mb-1">College Name *</label>
                <input
                  type="text"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleChange}
                  placeholder="Your college name"
                  className="w-full rounded-lg border border-white/10 bg-black/60 px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-red-700/60 transition-all duration-200 hover:bg-black/75"
                />
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-1">College ID / Roll No *</label>
                <input
                  type="text"
                  name="collegeId"
                  value={formData.collegeId}
                  onChange={handleChange}
                  placeholder="Your college ID"
                  className="w-full rounded-lg border border-white/10 bg-black/60 px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-red-700/60 transition-all duration-200 hover:bg-black/75"
                />
              </div>
            </motion.div>

            {/* Department - Full Width */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.18 }}
            >
              <label className="block text-sm text-white/70 mb-1">Department *</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="e.g., Computer Science, Mechanical, etc."
                className="w-full rounded-lg border border-white/10 bg-black/60 px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-red-700/60 transition-all duration-200 hover:bg-black/75"
              />
            </motion.div>

            {/* City and State - Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-sm text-white/70 mb-1">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Your city"
                  className="w-full rounded-lg border border-white/10 bg-black/60 px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-red-700/60 transition-all duration-200 hover:bg-black/75"
                />
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-1">State *</label>
                <select
                  aria-label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-black/60 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-700/60 [&>option]:bg-black [&>option]:text-white [&>option]:py-2 transition-all duration-200 hover:bg-black/75"
                >
                  <option value="" className="text-white/40">Select state</option>
                  {INDIAN_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>

            {/* Password - Full Width */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.22 }}
            >
              <label className="block text-sm text-white/70 mb-1">Password *</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  className="w-full rounded-lg border border-white/10 bg-black/60 px-4 py-2 pr-11 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-red-700/60 transition-all duration-200 hover:bg-black/75"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-md p-1 text-white/20 hover:text-white/50 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-md border border-red-800/40 bg-red-950/40 px-3 py-2 text-sm text-red-200"
              >
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-md border border-emerald-800/40 bg-emerald-950/40 px-3 py-2 text-sm text-emerald-200"
              >
                {success}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02, boxShadow: "0 0 24px rgba(139,0,0,0.45)" }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full overflow-hidden rounded-lg bg-linear-to-r from-[#5c0a0a] via-[#8b0000] to-[#5c0a0a] px-5 py-3 text-center font-medium text-white shadow-lg focus:outline-none disabled:opacity-70"
            >
              <span className="relative z-10 inline-flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Registering…
                  </>
                ) : (
                  <>Register as SA</>
                )}
              </span>
              {/* Shimmer overlay */}
              <motion.span
                aria-hidden
                initial={{ x: "-100%" }}
                animate={{ x: loading ? "100%" : "-100%" }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                className="absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/15 to-transparent"
              />
            </motion.button>
          </form>

        </motion.div>

        <p className="mt-6 text-center text-sm text-white/50">
          Already have an account? <a href="/ca/signin-sa" className="text-red-400 hover:text-red-300">Sign in</a>
        </p>
      </div>
    </div>
  )
}

export default RegisterSA
