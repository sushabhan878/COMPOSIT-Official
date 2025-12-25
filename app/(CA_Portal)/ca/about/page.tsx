"use client"

import React from 'react'
import { motion } from 'framer-motion'

const stats = [
  { label: 'Founded', value: '1994' },
  { label: 'Editions', value: '30+' },
  { label: 'Participants', value: '10k+' },
  { label: 'Partners', value: '60+' },
]

const focusAreas = [
  {
    title: 'Innovation & Research',
    description:
      'Cutting-edge sessions spotlight breakthroughs in materials science, sustainable metallurgy, and advanced manufacturing.',
  },
  {
    title: 'Industry Connect',
    description:
      'Dialogue with leaders from steel, mining, aerospace, and energy sectors to bridge campus ideas with real-world impact.',
  },
  {
    title: 'Student Power',
    description:
      'Competitions, hackathons, and showcases that celebrate student talent, curiosity, and ambition.',
  },
]

const timeline = [
  {
    year: '1994',
    title: 'The Beginning',
    detail: 'COMPOSIT launched as a pioneering platform by the Society of Metallurgical Engineers, IIT Kharagpur.',
  },
  {
    year: '2000s',
    title: 'Growing Momentum',
    detail: 'Expanded with national participation, elevating student-industry collaboration across India.',
  },
  {
    year: '2010s',
    title: 'Global Outlook',
    detail: 'Introduced international speakers, virtual connect, and deep dives into additive manufacturing and smart materials.',
  },
  {
    year: 'Today',
    title: 'Future-Ready',
    detail: 'A bold mix of talks, labs, and challenges built for the next generation of materials innovators.',
  },
]

const riseProps = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
}

const fadeProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
}

const About = () => {
  return (
    <div className="relative isolate overflow-hidden text-slate-50 mt-26">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16 sm:px-8 lg:px-12 lg:py-20">
        <motion.section
          className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
          initial={riseProps.initial}
          animate={riseProps.animate}
          transition={riseProps.transition}
        >
          <motion.div className="space-y-6" initial={riseProps.initial} animate={riseProps.animate} transition={riseProps.transition}>
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#7a1f2a]/80 px-4 py-2 text-sm font-medium text-white shadow-sm ring-1 ring-white/10">
              Congress of Metallurgical Professionals
            </span>
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                COMPOSIT at IIT Kharagpur
              </h1>
              <p className="text-lg leading-relaxed text-slate-200">
                COMPOSIT (Congress of Metallurgical Professionals involving Students, Industry, and Teachers) is one of India’s largest
                materials science fests, organized by the Society of Metallurgical Engineers, IIT Kharagpur. Since 1994, it has welcomed
                students, professionals, and academicians to explore innovations, share expertise, and celebrate advancements in materials
                science. Our mission is to inspire and connect bright minds, foster knowledge-sharing, showcase talent, and enable
                interaction with industry stalwarts—promising an exciting journey of events and opportunities for aspiring enthusiasts.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((item) => (
                <motion.div
                  key={item.label}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-xl"
                  initial={riseProps.initial}
                  animate={riseProps.animate}
                  transition={riseProps.transition}
                >
                  <div className="text-sm text-slate-300">{item.label}</div>
                  <div className="text-2xl font-semibold text-white">{item.value}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="relative" initial={riseProps.initial} animate={riseProps.animate} transition={riseProps.transition}>
            <div className="absolute inset-6 -z-10 rounded-3xl bg-linear-to-br from-[#7a1f2a]/40 via-[#0f172a]/30 to-[#1b2838]/50 blur-2xl" />
            <motion.div
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl"
              initial={riseProps.initial}
              animate={riseProps.animate}
              transition={riseProps.transition}
            >
              <div className="bg-linear-to-r from-[#7a1f2a] via-black to-[#2d4f9e] px-8 py-6 text-white">
                <p className="text-sm uppercase tracking-wide">Why it matters</p>
                <h3 className="text-2xl font-semibold">Shaping the future of materials</h3>
              </div>
              <div className="space-y-4 px-8 py-6 text-slate-100">
                <p>
                  From steelmaking to smart alloys, COMPOSIT is where theory meets practice. Expect live demonstrations, deep-dive talks,
                  and workshops that decode the latest trends in sustainability, circular metallurgy, and advanced processing.
                </p>
                <p>
                  Beyond sessions, the fest is a meeting ground—bringing together students eager to learn, industry leaders ready to
                  mentor, and researchers pushing boundaries. Every edition renews our commitment to make materials science more
                  collaborative, impactful, and accessible.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          className="grid gap-6 lg:grid-cols-3"
          initial={riseProps.initial}
          animate={riseProps.animate}
          transition={riseProps.transition}
        >
          {focusAreas.map((item, idx) => (
            <motion.div
              key={item.title}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-2xl"
              initial={riseProps.initial}
              animate={riseProps.animate}
              transition={{ ...riseProps.transition, delay: idx * 0.05 }}
            >
              <div className="h-2 w-12 rounded-full bg-linear-to-r from-[#7a1f2a] to-[#2d4f9e]" />
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="text-slate-200">{item.description}</p>
            </motion.div>
          ))}
        </motion.section>

        <motion.section
          className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center"
          initial={riseProps.initial}
          animate={riseProps.animate}
          transition={riseProps.transition}
        >
          <motion.div className="space-y-4" initial={riseProps.initial} animate={riseProps.animate} transition={riseProps.transition}>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">A timeline of momentum</h2>
            <p className="text-slate-200">
              Each year adds new chapters of collaboration—more labs, more workshops, and more minds united by the pursuit of better
              materials for the world.
            </p>
          </motion.div>
          <motion.div className="grid gap-4" initial={fadeProps.initial} animate={fadeProps.animate} transition={fadeProps.transition}>
            {timeline.map((item) => (
              <motion.div
                key={item.year}
                className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-5 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl"
                initial={riseProps.initial}
                animate={riseProps.animate}
                transition={riseProps.transition}
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-[#7a1f2a]/80 px-3 py-1 text-xs font-semibold text-white">{item.year}</span>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                </div>
                <p className="text-slate-200">{item.detail}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          className="rounded-3xl border border-white/10 bg-linear-to-r from-[#7a1f2a] via-black to-[#2d4f9e] px-8 py-10 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl"
          initial={riseProps.initial}
          animate={riseProps.animate}
          transition={riseProps.transition}
        >
          <div className="max-w-3xl space-y-4">
            <h2 className="text-2xl font-semibold sm:text-3xl">Join the journey</h2>
            <p className="text-base sm:text-lg text-white/90">
              Be part of the community that is redefining what materials can do—through curiosity, collaboration, and fearless
              experimentation. COMPOSIT is more than a fest; it is a launchpad for ideas that transform industries.
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default About
