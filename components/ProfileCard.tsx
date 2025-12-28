import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface ProfileCardProps {
  imageUrl: string
  name: string
  position: string
  linkedin?: string
  instagram?: string
  email?: string
  contactNo?: string
  description?: string
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  imageUrl,
  name,
  position,
  linkedin,
  instagram,
  email,
  contactNo,
  description,
}) => {
  return (
    <div className="group relative h-[340px] sm:h-[360px] lg:h-[380px] w-[280px] sm:w-[300px] lg:w-[300px] perspective">
      <div className="relative h-full w-full rounded-3xl transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl bg-black/40 shadow-2xl [backface-visibility:hidden]">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 400px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <h3 className="text-2xl font-bold text-white drop-shadow-lg">{name}</h3>
            <p className="text-sm font-semibold text-amber-400">{position}</p>
          </div>
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl" />
        </div>

        {/* Back */}
        <div className="absolute inset-0 flex flex-col justify-between rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-white/0 p-6 shadow-2xl backdrop-blur-md [backface-visibility:hidden] [transform:rotateY(180deg)] transition-all duration-300 group-hover:ring-2 group-hover:ring-amber-400 group-hover:shadow-lg group-hover:shadow-amber-400/40">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="text-sm font-semibold text-amber-400">{position}</p>
            <p className="text-sm leading-relaxed text-gray-300">
              {description || 'Passionate about materials science, collaboration, and building solutions that move the world forward.'}
            </p>
          </div>

          <div className="space-y-3 text-sm text-gray-300">
            {email && (
              <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {email}
              </a>
            )}

            {contactNo && (
              <a href={`tel:${contactNo}`} className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {contactNo}
              </a>
            )}
          </div>

          <div className="flex gap-3 pt-2">

            {linkedin && (
              <Link
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:bg-amber-400 hover:text-black hover:shadow-lg hover:shadow-amber-400/50 pointer-events-auto"
                title="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.732-2.004 1.438-.103.249-.129.597-.129.946v5.421h-3.554s.049-8.789 0-9.692h3.554v1.371c.429-.661 1.196-1.602 2.905-1.602 2.121 0 3.71 1.328 3.71 4.187v5.736zM5.337 9.433c-1.144 0-1.915-.762-1.915-1.715 0-.953.77-1.715 1.958-1.715 1.188 0 1.915.762 1.915 1.715 0 .953-.727 1.715-1.958 1.715zm1.946 11.019H3.391V9.761h3.892v10.691zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </Link>
            )}

            {instagram && (
              <Link
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:bg-amber-400 hover:text-black hover:shadow-lg hover:shadow-amber-400/50 pointer-events-auto"
                title="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm0 2a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2H7zm11.5.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zM12 8.5A3.5 3.5 0 1112 15.5 3.5 3.5 0 0112 8.5zm0 2a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                </svg>
              </Link>
            )}

            {email && (
              <Link
                href={`mailto:${email}`}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:bg-amber-400 hover:text-black hover:shadow-lg hover:shadow-amber-400/50 pointer-events-auto"
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
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:bg-amber-400 hover:text-black hover:shadow-lg hover:shadow-amber-400/50 pointer-events-auto"
                title="Call"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </Link>
            )}
          </div>

          <div className="absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
