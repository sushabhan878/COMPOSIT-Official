"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import GridBackground from "@/components/GridBackground"
import { signIn } from "next-auth/react"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"

const riseProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
}

const SigninSA: React.FC = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address.")
      return false
    }
    if (!formData.password.trim() || formData.password.length < 6) {
      setError("Password must be at least 6 characters.")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (!validateForm()) {
      return
    }

    try {
      setLoading(true)
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        setError(result.error || "Invalid email or password.")
      } else {
        router.push("/ca")
      }
    } catch (err: any) {
      setError(err?.message || "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-dvh flex items-center justify-center px-6 py-10 ">
      <GridBackground />

      <div className="w-full max-w-md">
        <motion.div {...riseProps} className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-wide text-white/90">Sign In as Student Ambassador</h1>
          <p className="mt-2 text-sm text-white/60">Welcome back! Sign in to access your SA portal.</p>
        </motion.div>

        <motion.div
          {...riseProps}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 }}
          className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-6 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.12 }}
            >
              <label className="block text-sm text-white/70 mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-white/10 bg-black/60 px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-red-700/60 transition-all duration-200 hover:bg-black/75"
              />
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.14 }}
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
                    Signing In…
                  </>
                ) : (
                  <>Sign In</>
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
          Don&apos;t have an account? <Link href="/ca/register-sa" className="text-red-400 hover:text-red-300">Register as SA</Link>
        </p>
      </div>
    </div>
  )
}

export default SigninSA
