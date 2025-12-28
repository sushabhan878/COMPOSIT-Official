"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export interface EventCardProps {
  imageUrl: string
  title: string
  description: string
  href: string
}

const EventCard: React.FC<EventCardProps> = ({ imageUrl, title, description, href }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="group relative w-[410px] h-[400px] overflow-hidden rounded-3xl bg-white/5 shadow-2xl backdrop-blur ring-1 ring-white/10"
    >
      {/* Hover background glow overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/10" />
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-amber-500/15 blur-3xl" />
        <div className="absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-orange-500/15 blur-3xl" />
      </div>
      {/* Image */}
      <div className="relative h-[58%] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={false}
        />
        {/* Overlay + Title */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
          <h3 className="text-3xl font-semibold text-white drop-shadow">
            {title}
          </h3>
          <span className="inline-block h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_12px_2px_rgba(251,191,36,0.6)]" />
        </div>
      </div>

      {/* Body */}
      <div className="flex h-[42%] w-full flex-col justify-between p-4">
        <p className="text-sm text-gray-300">
          {description}
        </p>
        <div className="mt-3">
          <Link
            href={href}
            className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-black shadow-lg shadow-amber-500/30 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-amber-500/40"
          >
            Read More
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Existing glow plus extra */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="pointer-events-none absolute -left-10 -bottom-10 h-44 w-44 rounded-full bg-orange-500/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  )
}

export default EventCard
