'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

const CaPortalNavbar = () => {
  const session = useSession()
  const user = session?.data?.user
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const baseNavItems = [
    { name: 'About', path: '/ca/about' },
    { name: 'Responsibilities', path: '/ca/responsibilities' },
    { name: 'Leader Board', path: '/ca/leaderboard' },
    { name: 'Contact Us', path: '/ca/contact-us' },
  ]

  const isSA = user?.role === 'sa'
  const actionItem = isSA
    ? { name: 'Profile', path: '/ca/profile' }
    : { name: 'Register as SA', path: '/ca/register-sa' }

  const navItems = [...baseNavItems, actionItem]

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90vw]">
      {/* Glass container */}
      <div className="backdrop-blur-3xl bg-white/5 border border-white/15 rounded-4xl shadow-[0_20px_60px_rgba(92,10,10,0.35)] px-6 py-4 transition-all duration-300">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/ca" className="transition-opacity hover:opacity-80">
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
            {navItems.map((item) => {
              const isActive = pathname === item.path
              const baseClasses = `px-6 py-2 rounded-4xl text-lg font-light transition-all duration-300 border block ${
                isActive
                  ? 'border-[#5c0a0a] text-white/90 bg-white/10 shadow-[0_10px_30px_rgba(92,10,10,0.35)]'
                  : 'border-transparent text-white/90 hover:border-[#5c0a0a] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(92,10,10,0.35)]'
              }`

              if (item.name === 'Profile') {
                return (
                  <Link key={item.path} href={item.path} className={`${baseClasses} flex items-center gap-2`}>
                    {user?.image ? (
                      <Image
                        src={user.image}
                        alt={user?.name || 'Profile'}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover border border-white/20"
                      />
                    ) : (
                      <span className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs text-white/90">
                        {user?.name?.trim()
                          ? user.name
                              .split(' ')
                              .map((n) => n[0])
                              .slice(0, 2)
                              .join('')
                              .toUpperCase()
                          : user?.email?.[0]?.toUpperCase() || 'P'}
                      </span>
                    )}
                    <span className="text-base">Profile</span>
                  </Link>
                )
              }

              return (
                <Link key={item.path} href={item.path} className={baseClasses}>
                  {item.name}
                </Link>
              )
            })}
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
              {navItems.map((item) => {
                const isActive = pathname === item.path
                const baseClasses = `px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 border block ${
                  isActive
                    ? 'border-[#5c0a0a] text-white/90 bg-white/10 shadow-[0_8px_24px_rgba(92,10,10,0.3)]'
                    : 'border-transparent text-white/90 hover:text-[#5c0a0a] hover:border-[#5c0a0a] hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(92,10,10,0.3)]'
                }`

                if (item.name === 'Profile') {
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`${baseClasses}`}
                    >
                      <span className="inline-flex items-center gap-2">
                        {user?.image ? (
                          <Image
                            src={user.image}
                            alt={user?.name || 'Profile'}
                            width={28}
                            height={28}
                            className="w-7 h-7 rounded-full object-cover border border-white/20"
                          />
                        ) : (
                          <span className="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[10px] text-white/90">
                            {user?.name?.trim()
                              ? user.name
                                  .split(' ')
                                  .map((n) => n[0])
                                  .slice(0, 2)
                                  .join('')
                                  .toUpperCase()
                              : user?.email?.[0]?.toUpperCase() || 'P'}
                          </span>
                        )}
                        <span>Profile</span>
                      </span>
                    </Link>
                  )
                }

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={baseClasses}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default CaPortalNavbar
