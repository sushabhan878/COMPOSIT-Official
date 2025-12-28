'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    About: [
      { name: 'About COMPOSIT', path: '/about' },
      { name: 'Our Team', path: '/our-team' },
      { name: 'Theme', path: '/about' },
    ],
    Activities: [
      { name: 'Events', path: '/events' },
      { name: 'Guest Lectures', path: '/guest-lectures' },
      { name: 'Exhibitions', path: '/exhibitions' },
      { name: 'Interactive Sessions', path: '/interactive-sessions' },
      { name: 'Schedule', path: '/schedule' },
    ],
    Resources: [
      { name: 'Sponsorships', path: '/sponsorships' },
      { name: 'Accommodations', path: '/accommodations' },
      { name: 'Contact Us', path: '/contact-us' },
    ],
  }

  const socialLinks = [
    { name: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/company/composit-iit-kharagpur/' },
    { name: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/composit_iitkgp/' },
    { name: 'Facebook', icon: 'facebook', url: 'https://www.facebook.com/composit.iitkgp' },
  ]

  return (
    <footer className="relative mt-20 pt-16 pb-8">
      {/* Glass container */}
      <div className="mx-auto max-w-10xl px-[5vw]">
        <div className="backdrop-blur-3xl bg-white/5 border border-white/15 rounded-3xl shadow-[0_20px_60px_rgba(92,10,10,0.35)] px-8 py-12 transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
            {/* Logo Section */}
            <div className="md:col-span-1 flex flex-col items-start">
              <Link href="/home" className="transition-opacity hover:opacity-80 mb-4">
                <Image
                  src="/Composit without text_ white.png"
                  alt="COMPOSIT Logo"
                  width={50}
                  height={50}
                  priority
                />
              </Link>
              <p className="text-xs text-white/60 max-w-[150px]">
                India's premier Materials Science Festival
              </p>
            </div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                  {category}
                </h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.path}
                        className="text-sm text-white/70 hover:text-amber-400 transition-colors duration-200 relative group"
                      >
                        {link.name}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300 ease-out"></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Contact Info */}
            <div className="space-y-2 text-center md:text-left">
              <p className="text-sm text-white/80">
                <span className="text-amber-400 font-semibold">Email:</span>{' '}
                <a href="mailto:composit.iit@gmail.com" className="hover:text-amber-400 transition-colors">
                  composit.iit@gmail.com
                </a>
              </p>
              <p className="text-sm text-white/80">
                <span className="text-amber-400 font-semibold">Phone:</span>{' '}
                <a href="tel:+919883908829" className="hover:text-amber-400 transition-colors">
                  +91 9883908829
                </a>
                <span className="mx-2 text-white/50">|</span>
                <a href="tel:+918917073738" className="hover:text-amber-400 transition-colors">
                  +91 8917073738
                </a>
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:bg-amber-400 hover:text-black hover:shadow-lg hover:shadow-amber-400/50 border border-white/20"
                  title={social.name}
                >
                  {social.icon === 'linkedin' && (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.732-2.004 1.438-.103.249-.129.597-.129.946v5.421h-3.554s.049-8.789 0-9.692h3.554v1.371c.429-.661 1.196-1.602 2.905-1.602 2.121 0 3.71 1.328 3.71 4.187v5.736zM5.337 9.433c-1.144 0-1.915-.762-1.915-1.715 0-.953.77-1.715 1.958-1.715 1.188 0 1.915.762 1.915 1.715 0 .953-.727 1.715-1.958 1.715zm1.946 11.019H3.391V9.761h3.892v10.691zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                    </svg>
                  )}
                  {social.icon === 'instagram' && (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm0 2a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2H7zm11.5.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zM12 8.5A3.5 3.5 0 1112 15.5 3.5 3.5 0 0112 8.5zm0 2a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                    </svg>
                  )}
                  {social.icon === 'facebook' && (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-white/50">
              © {currentYear} COMPOSIT. All rights reserved. | Made with{' '}
              <span className="text-amber-400">❤</span> by{' '}
              <span className="text-amber-400 font-semibold">COMPOSIT Team</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
