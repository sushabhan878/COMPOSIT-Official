import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface ProfileCardProps {
  imageUrl: string
  name: string
  position: string
  linkedin?: string
  email?: string
  contactNo?: string
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  imageUrl,
  name,
  position,
  linkedin,
  email,
  contactNo,
}) => {
  return (
    <div className="group relative h-full w-full">
      {/* Card Container */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:from-white/10 hover:to-white/5 hover:shadow-2xl hover:shadow-amber-500/20">
        {/* Image Section */}
        <div className="relative mb-6 overflow-hidden rounded-2xl">
          <Image
            src={imageUrl}
            alt={name}
            width={400}
            height={400}
            className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* Content Section */}
        <div className="space-y-3">
          {/* Name */}
          <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-amber-400">
            {name}
          </h3>

          {/* Position */}
          <p className="text-sm font-semibold text-amber-400">{position}</p>

          {/* Description/Bio Space */}
          <p className="text-xs leading-relaxed text-gray-400">
            Materials science enthusiast | Innovation catalyst | Future leader
          </p>
        </div>

        {/* Contact Info - Hidden by default, visible on hover */}
        <div className="mt-4 space-y-2 border-t border-white/10 pt-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {email && (
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <svg className="h-4 w-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href={`mailto:${email}`} className="hover:text-amber-400 transition-colors">
                {email}
              </a>
            </div>
          )}

          {contactNo && (
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <svg className="h-4 w-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href={`tel:${contactNo}`} className="hover:text-amber-400 transition-colors">
                {contactNo}
              </a>
            </div>
          )}
        </div>

        {/* Social Links */}
        <div className="mt-4 flex gap-3 pt-4 border-t border-white/10">
          {linkedin && (
            <Link
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:bg-amber-400 hover:text-black"
              title="LinkedIn"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.732-2.004 1.438-.103.249-.129.597-.129.946v5.421h-3.554s.049-8.789 0-9.692h3.554v1.371c.429-.661 1.196-1.602 2.905-1.602 2.121 0 3.71 1.328 3.71 4.187v5.736zM5.337 9.433c-1.144 0-1.915-.762-1.915-1.715 0-.953.77-1.715 1.958-1.715 1.188 0 1.915.762 1.915 1.715 0 .953-.727 1.715-1.958 1.715zm1.946 11.019H3.391V9.761h3.892v10.691zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
            </Link>
          )}

          {email && (
            <Link
              href={`mailto:${email}`}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:bg-amber-400 hover:text-black"
              title="Email"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </Link>
          )}

          {contactNo && (
            <Link
              href={`tel:${contactNo}`}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:bg-amber-400 hover:text-black"
              title="Call"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </Link>
          )}
        </div>

        {/* Decorative Element */}
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-amber-500/5 blur-2xl transition-all duration-300 group-hover:bg-amber-500/10" />
      </div>
    </div>
  )
}

export default ProfileCard
