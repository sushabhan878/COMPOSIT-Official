"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { LinkIcon, MailIcon, PhoneIcon } from 'lucide-react'

export type ContactCardProps = {
  name: string
  position: string
  email: string
  contact: string
  linkedin: string
  imageUrl: string
}

const ContactCard: React.FC<ContactCardProps> = ({ name, position, email, contact, linkedin, imageUrl }) => {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-50 shadow-lg backdrop-blur transition-all duration-500 hover:-translate-y-1.5 hover:border-white/25 hover:shadow-2xl"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-[#7a1f2a]/25 via-black/30 to-[#2d4f9e]/30 opacity-80" />
      <div className="absolute inset-0 -z-10 blur-2xl bg-linear-to-r from-[#7a1f2a]/15 via-transparent to-[#2d4f9e]/15 opacity-60" />

      <div className="flex items-center gap-5">
        <div className="h-24 w-24 overflow-hidden rounded-full border border-white/25 bg-black/40 shadow-inner shadow-black/30 transition-transform duration-500 group-hover:scale-105">
          <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
        </div>
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.2em] text-white/70">{position}</p>
          <h3 className="text-xl font-semibold text-white">{name}</h3>
        </div>
      </div>

      <div className="mt-5 space-y-2 text-sm text-white/80">
        <motion.a
          href={`mailto:${email}`}
          className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:translate-x-1"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: 0.05 }}
        >
          <MailIcon size={16} />
          <span>{email}</span>
        </motion.a>
        <motion.a
          href={`tel:${contact}`}
          className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:translate-x-1"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 }}
        >
          <PhoneIcon size={16} />
          <span>{contact}</span>
        </motion.a>
        <motion.a
          href={linkedin}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:translate-x-1"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: 0.15 }}
        >
          <LinkIcon size={16} />
          <span>LinkedIn</span>
        </motion.a>
      </div>
    </motion.div>
  )
}

export default ContactCard
