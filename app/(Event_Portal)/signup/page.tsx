"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import GridBackground from "@/components/GridBackground";
import { signIn } from "next-auth/react";
import {
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  Timer as TimerIcon,
  RefreshCw,
} from "lucide-react";
import axios from "axios";

const Signup: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // --- Form State ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [referral, setReferral] = useState<string | null>(null);

  // --- UI State ---
  const [isOtpSent, setIsOtpSent] = useState(false); // Controls the stage
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [resendTimer, setResendTimer] = useState<number>(0);

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      setReferral(ref);
      localStorage.setItem("referralCode", ref);
    }
  }, [searchParams]);

  // countdown for resend
  useEffect(() => {
    if (!isOtpSent || resendTimer <= 0) return;
    const id = setInterval(() => {
      setResendTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [isOtpSent, resendTimer]);

  // --- STEP 1: SEND OTP ---
  const handleSendOtp = async () => {
    setError(null);
    setSuccess(null);

    if (!name.trim()) return setError("Please enter your name.");
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return setError("Please enter a valid email address.");
    }

    try {
      setLoading(true);
      // Calls API 1: Creates temp user & sends email
      const res = await axios.post("/api/auth/send-otp", { name, email });

      if (res.status === 200) {
        setIsOtpSent(true); // Move to Stage 2
        setSuccess("OTP sent! Check your inbox.");
        setResendTimer(60);
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  // --- STEP 2: FINALIZE SIGNUP ---
  const handleFinalSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (otp.length !== 6) return setError("Please enter the 6-digit OTP.");
    if (password.length < 6)
      return setError("Password must be at least 6 characters.");

    try {
      setLoading(true);
      const referralCode = referral || localStorage.getItem("referralCode");

      // Calls API 2: Verifies OTP + Sets Password + Referrals
      const res = await axios.post("/api/auth/signup", {
        email,
        otp,
        password,
        referralCode,
      });

      if (res.status === 200) {
        setSuccess("Account created successfully! Logging you in...");
        localStorage.removeItem("referralCode");

        // Auto-Login
        await signIn("credentials", {
          email,
          password,
          redirect: true,
          callbackUrl: "/home",
        });
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Signup failed. Invalid OTP or Server Error.",
      );
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!isOtpSent || resendTimer > 0) return;
    setError(null);
    setSuccess(null);
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/send-otp", { name, email });
      if (res.status === 200) {
        setResendTimer(60);
        setSuccess("OTP resent. Please check your inbox.");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  // --- GOOGLE LOGIN ---
  const onGoogleSignup = async () => {
    try {
      const referralCode = referral || localStorage.getItem("referralCode");
      if (referralCode) {
        await axios.post("/api/referral", { referralCode });
      }
      await signIn("google", { callbackUrl: "/home" });
    } catch (err) {
      setError("Google signup is currently unavailable.");
    }
  };

  return (
    <div className="relative min-h-dvh flex items-center justify-center px-6 py-10">
      <GridBackground />

      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-wide text-white/90">
            Create Account
          </h1>
          <p className="mt-2 text-sm text-white/60">
            {isOtpSent ? "Check your email for the code" : "Join the community"}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-6 shadow-2xl transition-all duration-300">
          <form
            onSubmit={
              isOtpSent
                ? handleFinalSignup
                : (e) => {
                    e.preventDefault();
                    handleSendOtp();
                  }
            }
            className="space-y-4"
          >
            {/* NAME INPUT */}
            <div>
              <label className="block text-sm text-white/70 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                disabled={isOtpSent} // Lock after step 1
                className="w-full rounded-lg border border-white/10 bg-black/60 px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-red-700/60 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* EMAIL INPUT */}
            <div>
              <label className="block text-sm text-white/70 mb-1">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  disabled={isOtpSent} // Lock after step 1
                  className="w-full rounded-lg border border-white/10 bg-black/60 px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-red-700/60 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {isOtpSent && (
                  <button
                    type="button"
                    onClick={() => setIsOtpSent(false)}
                    className="absolute right-2 top-2 text-xs text-red-400 hover:text-red-300 underline"
                    aria-label="Change email"
                  >
                    Change?
                  </button>
                )}
              </div>
            </div>

            {/* EXPANDABLE SECTION: OTP & PASSWORD */}
            <AnimatePresence>
              {isOtpSent && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 overflow-hidden"
                >
                  <div className="space-y-4 pt-2 border-t border-white/10">
                    {/* OTP INPUT */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Verification Code
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={otp}
                        onChange={(e) =>
                          setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                        }
                        placeholder="000000"
                        maxLength={6}
                        className="w-full rounded-lg border border-white/20 bg-black/40 px-4 py-3 text-center text-2xl tracking-widest font-semibold text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all"
                        aria-label="One-time password"
                      />
                      <p className="text-xs text-white/50 mt-1">
                        Check your email for the code
                      </p>
                    </div>

                    {/* RESEND SECTION */}
                    <div className="rounded-lg border border-white/10 bg-black/30 px-3 py-3 flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 text-xs text-white/70">
                        <TimerIcon className="h-4 w-4" />
                        <span>
                          {resendTimer > 0 ? (
                            <>
                              Resend in{" "}
                              <span className="font-semibold text-white">
                                {resendTimer}s
                              </span>
                            </>
                          ) : (
                            <>
                              Didn't receive?{" "}
                              <span className="text-white/90">Resend OTP</span>
                            </>
                          )}
                        </span>
                      </span>
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={resendTimer > 0 || loading}
                        className="inline-flex items-center gap-1.5 rounded-md bg-red-900/30 border border-red-700/40 px-3 py-1.5 text-xs text-red-300 hover:bg-red-900/50 hover:border-red-700/60 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        <RefreshCw className="h-3.5 w-3.5" /> Resend
                      </button>
                    </div>

                    {/* PASSWORD INPUT */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Set Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full rounded-lg border border-white/20 bg-black/40 px-4 py-3 pr-11 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all"
                          aria-label="Password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/40 hover:text-white/70 transition-colors"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-white/50 mt-1">
                        At least 6 characters
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ALERTS */}
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

            {/* ACTION BUTTON */}
            <motion.button
              type={isOtpSent ? "submit" : "button"}
              onClick={isOtpSent ? undefined : handleSendOtp}
              disabled={loading}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 24px rgba(139,0,0,0.45)",
              }}
              whileTap={{ scale: 0.98 }}
              className={`relative w-full overflow-hidden rounded-lg px-5 py-3 text-center font-medium text-white shadow-lg transition-all ${
                isOtpSent
                  ? "bg-linear-to-r from-emerald-900 via-emerald-700 to-emerald-900 hover:shadow-emerald-900/50"
                  : "bg-linear-to-r from-[#5c0a0a] via-[#8b0000] to-[#5c0a0a]"
              } disabled:opacity-70`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {isOtpSent ? "Creating..." : "Sending..."}
                  </>
                ) : isOtpSent ? (
                  "Create Account"
                ) : (
                  <>
                    Send OTP <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </span>
            </motion.button>
          </form>

          {/* DIVIDER */}
          {!isOtpSent && (
            <>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-xs text-white/40">or</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <button
                type="button"
                onClick={onGoogleSignup}
                className="mt-4 w-full rounded-lg border border-white/15 bg-black/50 px-5 py-3 text-white hover:bg-black/60 transition-colors"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-5 w-5" viewBox="0 0 48 48">
                    <path
                      fill="#FFC107"
                      d="M43.611 20.083H42V20H24v8h11.303C33.44 31.91 29.043 35 24 35 16.268 35 10 28.732 10 21s6.268-14 14-14c3.59 0 6.845 1.351 9.348 3.552l5.657-5.657C35.743 1.676 30.128 0 24 0 10.745 0 0 10.745 0 24s10.745 24 24 24c12.132 0 22.236-8.86 23.743-20.327.171-1.192.257-2.415.257-3.673 0-1.245-.086-2.466-.259-3.644z"
                    />
                    <path
                      fill="#FF3D00"
                      d="M6.306 14.691l6.586 4.823C14.094 16.257 18.68 13 24 13c3.59 0 6.845 1.351 9.348 3.552l5.657-5.657C35.743 1.676 30.128 0 24 0 15.315 0 7.762 4.512 3.294 11.29l3.012 3.401z"
                    />
                    <path
                      fill="#4CAF50"
                      d="M24 48c5.996 0 11.464-2.293 15.616-6.024l-7.211-5.994C30.611 37.668 27.427 39 24 39c-5.018 0-9.397-3.053-11.307-7.438l-6.52 5.02C10.588 43.424 16.82 48 24 48z"
                    />
                    <path
                      fill="#1976D2"
                      d="M43.611 20.083H42V20H24v8h11.303c-1.673 3.827-5.92 6.917-11.303 6.917-5.018 0-9.397-3.053-11.307-7.438l-6.52 5.02C10.588 43.424 16.82 48 24 48c12.132 0 22.236-8.86 23.743-20.327.171-1.192.257-2.415.257-3.673 0-1.245-.086-2.466-.259-3.644z"
                    />
                  </svg>
                  Sign up with Google
                </span>
              </button>
            </>
          )}

          <p className="mt-6 text-center text-sm text-white/50">
            Already have an account?{" "}
            <a href="/signin" className="text-red-400 hover:text-red-300">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
