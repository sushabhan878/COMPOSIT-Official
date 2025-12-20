'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const CaPortalNavbar = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: 'About', path: '/ca/about' },
    { name: 'Responsibilities', path: '/ca/responsibilities' },
    { name: 'Registrations', path: '/ca/registrations' },
    { name: 'Leader Board', path: '/ca/leaderboard' },
    { name: 'Profile', path: '/ca/profile' },
  ]

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90vw]">
      {/* Glass container */}
      <div className="backdrop-blur-3xl bg-white/5 border border-white/15 rounded-4xl shadow-[0_20px_60px_rgba(92,10,10,0.35)] px-6 py-4 transition-all duration-300">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/home" className="transition-opacity hover:opacity-80">
            <Image
              src="/Composit without text_ white.png"
              alt="COMPOSIT Logo"
              width={60}
              height={60}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-6 py-2 rounded-4xl text-lg font-light transition-all duration-300 border block ${
                  pathname === item.path
                    ? 'border-[#5c0a0a] text-white/90 bg-white/10 shadow-[0_10px_30px_rgba(92,10,10,0.35)]'
                    : 'border-transparent text-white/90 hover:border-[#5c0a0a] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(92,10,10,0.35)]'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            title="hamburger menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/20 shadow-[0_18px_38px_rgba(92,10,10,0.3)] rounded-2xl">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 border block ${
                    pathname === item.path
                      ? 'border-[#5c0a0a] text-white/90 bg-white/10 shadow-[0_8px_24px_rgba(92,10,10,0.3)]'
                      : 'border-transparent text-white/90 hover:text-[#5c0a0a] hover:border-[#5c0a0a] hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(92,10,10,0.3)]'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default CaPortalNavbar
