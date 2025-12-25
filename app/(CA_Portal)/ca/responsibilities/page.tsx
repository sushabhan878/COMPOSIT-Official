"use client"

import React from 'react'
import { motion } from 'framer-motion'

const riseProps = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
}

const responsibilities = [
  'Act as a bridge between COMPOSIT, IIT Kharagpur, and your college.',
  'Encourage and ensure active participation of students from your college in events, workshops, Guest Lectures, and competitions.',
  'Publicize COMPOSIT and its events within your college to build awareness and excitement.',
  "Promote COMPOSIT's initiatives through social media platforms and word-of-mouth campaigns.",
  'Represent your college at COMPOSIT and showcase its talent on a prestigious platform.',
]

const benefits = [
  'Receive a prestigious certificate signed by the Head of the Department, IIT Kharagpur, as recognition for your efforts.',
  'Get special discounts on accommodation during the fest, scaled to the number of registrations you bring.',
  'Build valuable connections with IIT KGP professors and students, enhancing your academic and professional network.',
  'Get featured in a special post on all official COMPOSIT social media handles if you rank among the top 20 ambassadors.',
  'Enjoy exciting goodies and gifts as a token of appreciation after the fest.',
]

const Responsibilities = () => {
  return (
    <div className="relative isolate overflow-hidden text-slate-50 mt-20">
      <div className="mx-auto flex max-w-5xl flex-col gap-14 px-4 py-16 sm:px-8 lg:px-10 lg:py-20">
        <motion.header
          className="space-y-4 text-center"
          initial={riseProps.initial}
          animate={riseProps.animate}
          transition={riseProps.transition}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-[#7a1f2a]/80 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white ring-1 ring-white/10">
            Campus Ambassador
          </span>
          <h1 className="text-3xl font-semibold sm:text-4xl">Responsibilities & Benefits</h1>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-slate-200">
            Be the driving force of COMPOSIT in your college—connect communities, spark participation, and spotlight talent while
            unlocking exclusive perks crafted for ambassadors.
          </p>
        </motion.header>

        <section className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          <motion.div
            className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl"
            initial={riseProps.initial}
            animate={riseProps.animate}
            transition={riseProps.transition}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#7a1f2a] to-[#2d4f9e] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              Responsibilities
            </div>
            <h2 className="text-2xl font-semibold">What you will drive</h2>
            <ul className="space-y-3 text-slate-200">
              {responsibilities.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-2xl border border-white/5 bg-white/5 p-3 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-lg"
                >
                  <motion.div
                    className="flex gap-3"
                    initial={riseProps.initial}
                    animate={riseProps.animate}
                    transition={riseProps.transition}
                  >
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-linear-to-br from-[#7a1f2a] to-[#2d4f9e]" aria-hidden />
                    <span>{item}</span>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="space-y-4 rounded-3xl border border-white/10 bg-linear-to-br from-[#7a1f2a]/20 via-black/40 to-[#2d4f9e]/25 p-8 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl"
            initial={riseProps.initial}
            animate={riseProps.animate}
            transition={riseProps.transition}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              Benefits
            </div>
            <h2 className="text-2xl font-semibold">Why it is worth it</h2>
            <ol className="space-y-3 text-slate-100">
              {benefits.map((item, index) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-2xl border border-white/5 bg-white/5 p-3 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-lg"
                >
                  <motion.div
                    className="flex gap-3"
                    initial={riseProps.initial}
                    animate={riseProps.animate}
                    transition={{ ...riseProps.transition, delay: index * 0.04 }}
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-linear-to-br from-[#7a1f2a] to-[#2d4f9e] text-sm font-semibold text-white">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                </li>
              ))}
            </ol>
          </motion.div>
        </section>

        <motion.section
          className="rounded-3xl border border-white/10 bg-linear-to-r from-[#7a1f2a] via-black to-[#2d4f9e] px-8 py-10 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl"
          initial={riseProps.initial}
          animate={riseProps.animate}
          transition={riseProps.transition}
        >
          <div className="space-y-3 text-center">
            <h3 className="text-2xl font-semibold">Lead the charge for COMPOSIT</h3>
            <p className="text-base text-white/90">
              Rally your campus, inspire peers, and earn recognition from IIT Kharagpur while building a network that lasts beyond the fest.
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default Responsibilities
