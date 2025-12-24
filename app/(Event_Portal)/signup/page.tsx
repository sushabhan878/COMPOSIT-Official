"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import GridBackground from "@/components/GridBackground"
import { signIn } from "next-auth/react"
import { Eye, EyeOff } from "lucide-react"
import axios from "axios"

const Signup: React.FC = () => {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill out all fields.")
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.")
      return
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.")
      return
    }

    try {
      setLoading(true)
      const res = await axios.post("/api/auth/signup", { name, email, password })

      if (res.status !== 200) {
        throw new Error(res.data?.message || "Signup failed")
      }

      setSuccess("Account created! Redirecting to sign in…")
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/home"
      })
    } catch (err: any) {
      setError(err?.message || "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  const onGoogleSignup = async () => {
    try {
      // If Google provider isn't configured, NextAuth will route to error page.
      await signIn("google", { callbackUrl: "/home" })
    } catch (err) {
      setError("Google signup is currently unavailable.")
    }
  }

  return (
    <div className="relative min-h-[100dvh] flex items-center justify-center px-6 py-10">
      <GridBackground />

      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-wide text-white/90">Create your COMPOSIT account</h1>
          <p className="mt-2 text-sm text-white/60">Join the community and stay in sync with events.</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-6 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-white/70 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full rounded-lg border border-white/10 bg-black/60 px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-red-700/60"
              />
            </div>

            <div>
              <label className="block text-sm text-white/70 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-white/10 bg-black/60 px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-red-700/60"
              />
            </div>

            <div>
              <label className="block text-sm text-white/70 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full rounded-lg border border-white/10 bg-black/60 px-4 py-2 pr-11 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-red-700/60"
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
            </div>

            {error && (
              <div className="rounded-md border border-red-800/40 bg-red-950/40 px-3 py-2 text-sm text-red-200">
                {error}
              </div>
            )}
            {success && (
              <div className="rounded-md border border-emerald-800/40 bg-emerald-950/40 px-3 py-2 text-sm text-emerald-200">
                {success}
              </div>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02, boxShadow: "0 0 24px rgba(139,0,0,0.45)" }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-[#5c0a0a] via-[#8b0000] to-[#5c0a0a] px-5 py-3 text-center font-medium text-white shadow-lg focus:outline-none disabled:opacity-70"
            >
              <span className="relative z-10 inline-flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Signing up…
                  </>
                ) : (
                  <>Sign up</>
                )}
              </span>
              {/* Shimmer overlay */}
              <motion.span
                aria-hidden
                initial={{ x: "-100%" }}
                animate={{ x: loading ? "100%" : "-100%" }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent"
              />
            </motion.button>
          </form>

          <div className="mt-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-white/40">or</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <button
            type="button"
            onClick={onGoogleSignup}
            className="mt-4 w-full rounded-lg border border-white/15 bg-black/50 px-5 py-3 text-white hover:border-white/30 hover:bg-black/60 transition-colors"
          >
            <span className="inline-flex items-center justify-center gap-2">
              {/* Google G icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.44 31.91 29.043 35 24 35 16.268 35 10 28.732 10 21s6.268-14 14-14c3.59 0 6.845 1.351 9.348 3.552l5.657-5.657C35.743 1.676 30.128 0 24 0 10.745 0 0 10.745 0 24s10.745 24 24 24c12.132 0 22.236-8.86 23.743-20.327.171-1.192.257-2.415.257-3.673 0-1.245-.086-2.466-.259-3.644z"/>
                <path fill="#FF3D00" d="M6.306 14.691l6.586 4.823C14.094 16.257 18.68 13 24 13c3.59 0 6.845 1.351 9.348 3.552l5.657-5.657C35.743 1.676 30.128 0 24 0 15.315 0 7.762 4.512 3.294 11.29l3.012 3.401z"/>
                <path fill="#4CAF50" d="M24 48c5.996 0 11.464-2.293 15.616-6.024l-7.211-5.994C30.611 37.668 27.427 39 24 39c-5.018 0-9.397-3.053-11.307-7.438l-6.52 5.02C10.588 43.424 16.82 48 24 48z"/>
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-1.673 3.827-5.92 6.917-11.303 6.917-5.018 0-9.397-3.053-11.307-7.438l-6.52 5.02C10.588 43.424 16.82 48 24 48c12.132 0 22.236-8.86 23.743-20.327.171-1.192.257-2.415.257-3.673 0-1.245-.086-2.466-.259-3.644z"/>
              </svg>
              Sign up with Google
            </span>
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-white/50">
          Already have an account? <a href="/signin" className="text-red-400 hover:text-red-300">Sign in</a>
        </p>
      </div>
    </div>
  )
}

export default Signup
