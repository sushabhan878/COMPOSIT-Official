'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'


const Navbar = () => {
  const { data: session, status } = useSession()
  const user = session?.user
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isActivitiesDropdownOpen, setIsActivitiesDropdownOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const profileCloseTimer = useRef<NodeJS.Timeout | null>(null)

  const openProfileMenu = () => {
    if (profileCloseTimer.current) {
      clearTimeout(profileCloseTimer.current)
      profileCloseTimer.current = null
    }
    setIsProfileDropdownOpen(true)
  }

  const scheduleCloseProfileMenu = () => {
    if (profileCloseTimer.current) clearTimeout(profileCloseTimer.current)
    profileCloseTimer.current = setTimeout(() => {
      setIsProfileDropdownOpen(false)
    }, 180)
  }

  useEffect(() => {
    return () => {
      if (profileCloseTimer.current) clearTimeout(profileCloseTimer.current)
    }
  }, [])
  const isAuthenticated = !!user?.email

  const navItems = [
    { name: 'About', path: '/about' },
    { name: 'Our Team', path: '/our-team' },
    { name: 'Activities', path: '', hasDropdown: true },
    { name: 'Sponsorships', path: '/sponsorships' },
    { name: 'Accommodations', path: '/accommodations' },
  ]

  const activitiesDropdown = [
    { name: 'Events', path: '/events' },
    { name: 'Guest Lectures', path: '/guest-lectures' },
    { name: 'Exhibitions', path: '/exhibitions' },
    { name: 'Interactive Sessions', path: '/interactive-sessions' },
    { name: 'Schedule', path: '/schedule' },
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
              <div key={item.path} className="relative group">
                <Link
                  href={item.path}
                  className={`px-6 py-2 rounded-4xl text-lg font-light transition-all duration-300 border block ${
                    pathname === item.path
                      ? 'border-[#5c0a0a] text-white/90 bg-white/10 shadow-[0_10px_30px_rgba(92,10,10,0.35)]'
                      : 'border-transparent text-white/90 hover:border-[#5c0a0a] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(92,10,10,0.35)]'
                  }`}
                >
                  {item.name}
                </Link>

                {/* Activities Dropdown */}
                {item.hasDropdown && (
                  <div className="absolute left-0 mt-2 w-48 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-[0_10px_40px_rgba(92,10,10,0.35)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2 z-10">
                    {activitiesDropdown.map((subItem) => (
                      <Link
                        key={subItem.path}
                        href={subItem.path}
                        className="px-4 py-2 text-sm text-white/90 transition-all duration-200 block relative overflow-hidden group/item"
                      >
                        {subItem.name}
                        <span className="absolute bottom-0 left-1/24 w-0 h-0.5 bg-[#5c0a0a] group-hover/item:w-full transition-all duration-500 ease-out"></span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Profile / Auth */}
            <div
              className="relative"
              onMouseEnter={openProfileMenu}
              onMouseLeave={scheduleCloseProfileMenu}
            >
              {isAuthenticated ? (
                <button
                  className={`px-4 py-2 rounded-4xl text-lg font-light transition-all duration-300 border block flex items-center gap-2 ${
                    pathname.startsWith('/profile')
                      ? 'border-[#5c0a0a] text-white/90 bg-white/10 shadow-[0_10px_30px_rgba(92,10,10,0.35)]'
                      : 'border-transparent text-white/90 hover:border-[#5c0a0a] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(92,10,10,0.35)]'
                  }`}
                >
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
                  <span className="text-base">Profile</span>
                </button>
              ) : (
                <Link
                  href="/signin"
                  className={`px-6 py-2 rounded-4xl text-lg font-light transition-all duration-300 border block ${
                    pathname === '/signin'
                      ? 'border-[#5c0a0a] text-white/90 bg-white/10 shadow-[0_10px_30px_rgba(92,10,10,0.35)]'
                      : 'border-transparent text-white/90 hover:border-[#5c0a0a] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(92,10,10,0.35)]'
                  }`}
                >
                  Sign In
                </Link>
              )}

              {isAuthenticated && isProfileDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-44 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-[0_10px_40px_rgba(92,10,10,0.35)] py-2 z-10"
                  onMouseEnter={openProfileMenu}
                  onMouseLeave={scheduleCloseProfileMenu}
                >
                  <Link
                    href="/profile"
                    className="px-4 py-2 text-sm text-white/90 transition-all duration-200 block relative overflow-hidden group/item"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    Profile
                    <span className="absolute bottom-0 left-1/24 w-0 h-0.5 bg-[#5c0a0a] group-hover/item:w-full transition-all duration-500 ease-out"></span>
                  </Link>
                  <button
                    onClick={() => {
                      setIsProfileDropdownOpen(false)
                      signOut({ callbackUrl: '/' })

                    }}
                    className="w-full px-4 py-2 text-left text-sm text-white/90 transition-all duration-200 relative overflow-hidden group/item"
                  >
                    Logout
                    <span className="absolute bottom-0 left-1/24 w-0 h-0.5 bg-[#5c0a0a] group-hover/item:w-full transition-all duration-500 ease-out"></span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
            <button
            title='hamburger menu'
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
                <div key={item.path}>
                  {item.hasDropdown ? (
                    <button
                      onClick={() => setIsActivitiesDropdownOpen(!isActivitiesDropdownOpen)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 border ${
                        pathname === item.path
                          ? 'border-[#5c0a0a] text-white/90 bg-white/10 shadow-[0_8px_24px_rgba(92,10,10,0.3)]'
                          : 'border-transparent text-white/90 hover:text-[#5c0a0a] hover:border-[#5c0a0a] hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(92,10,10,0.3)]'
                      }`}
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
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
                  )}
                  {item.hasDropdown && isActivitiesDropdownOpen && (
                    <div className="bg-white/5 rounded-xl mt-2 py-2 ml-2 border border-white/10">
                      {activitiesDropdown.map((subItem) => (
                        <Link
                          key={subItem.path}
                          href={subItem.path}
                          onClick={() => {
                            setIsMenuOpen(false)
                            setIsActivitiesDropdownOpen(false)
                          }}
                          className="px-4 py-2 text-sm text-white/90 hover:text-[#5c0a0a] transition-all duration-200 block relative overflow-hidden group/item"
                        >
                          {subItem.name}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#5c0a0a] group-hover/item:w-full transition-all duration-500 ease-out"></span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Profile / Auth mobile */}
              <div className="bg-white/5 rounded-xl mt-2 py-2 border border-white/10">
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className={`px-4 py-2 text-sm text-white/90 block transition-all duration-200 ${
                        pathname.startsWith('/profile')
                          ? 'text-[#5c0a0a]'
                          : 'hover:text-[#5c0a0a]'
                      }`}
                    >
                      <span className="inline-flex items-center gap-2">
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
                        <span>Profile</span>
                      </span>
                    </Link>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false)
                        signOut({ callbackUrl: '/' })
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-white/90 hover:text-[#5c0a0a] transition-all duration-200"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/signin"
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-2 text-sm text-white/90 block transition-all duration-200 ${
                      pathname === '/signin'
                        ? 'text-[#5c0a0a]'
                        : 'hover:text-[#5c0a0a]'
                    }`}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
