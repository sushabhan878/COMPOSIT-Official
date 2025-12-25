"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const riseProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
}

const responsibilities = [
  'Champion COMPOSIT at your campus and bridge students with IIT Kharagpur.',
  'Drive registrations for events, workshops, and guest lectures.',
  'Promote updates through posters, socials, and word-of-mouth campaigns.',
  'Curate questions and feedback from your campus for the organizing team.',
]

const benefits = [
  'Certificate signed by IIT Kharagpur leadership.',
  'Accommodation discounts based on registrations you bring.',
  'Priority networking with IIT KGP faculty, alumni, and industry speakers.',
  'Social media spotlight for top 20 ambassadors across official handles.',
  'Exclusive goodies and a gratitude package post-fest.',
]

const faqs = [
  {
    q: 'What is the role of a Campus Ambassador?',
    a: 'Campus Ambassador will represent COMPOSIT, IIT Kharagpur in their colleges. They will be the first point of contact to any student who requires information about COMPOSIT. They would promote and motivate students to participate in the events conducted by COMPOSIT.',
  },
  {
    q: 'Am I suitable to become a Campus Ambassador?',
    a: 'Yes. Any college student driven with enthusiasm is eligible to become a Campus Ambassador.',
  },
  {
    q: 'How can I apply for the post of Campus Ambassador?',
    a: 'Click on Sign Up and register. You will receive an email after successful registration.',
  },
  {
    q: 'What is the selection process?',
    a: 'After you register through our website, you will have to go through a short telephonic interview before being selected.',
  },
  {
    q: 'How many Campus Ambassadors are usually chosen from a particular college?',
    a: 'One or more campus ambassadors are chosen depending on the size of the college and the number of students who have applied for the position.',
  },
  {
    q: 'How much time do I need to devote to COMPOSIT, IIT Kharagpur once selected as a Campus Ambassador?',
    a: 'There is no particular constraint on the number of hours per week that you need to devote. It may vary depending on the number of tasks allotted and how smartly and efficiently you perform it.',
  },
]

const CA = () => {
  return (
    <div className="relative isolate overflow-hidden text-slate-50 mt-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-14 px-4 py-16 sm:px-8 lg:px-12 lg:py-20">
        <motion.section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center" initial={riseProps.initial} animate={riseProps.animate} transition={riseProps.transition}>
          <div className="space-y-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#7a1f2a]/80 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white ring-1 ring-white/10">
              Campus Ambassador
            </span>
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl leading-tight">
                Lead COMPOSIT at your campus and inspire the next wave of materials innovators.
              </h1>
              <p className="text-lg leading-relaxed text-slate-200">
                Be the face of one of India’s largest materials science fests at IIT Kharagpur. Rally peers, collaborate with industry and
                academia, and unlock exclusive perks crafted for our most driven ambassadors.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-linear-to-r from-[#7a1f2a] via-[#2d4f9e] to-[#7a1f2a] blur-xl opacity-75 animate-pulse" />
                <Link
                  href="/ca/register-sa"
                  className="relative block rounded-full bg-linear-to-r from-[#7a1f2a] via-black to-[#2d4f9e] px-7 py-3 text-sm font-bold uppercase tracking-widest text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(122,31,42,0.8)] hover:scale-105"
                >
                  Become an Ambassador
                </Link>
              </div>
              <Link
                href="/ca/contact-us"
                className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:text-white hover:bg-white/5"
              >
                Talk to us
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
            <div className="absolute inset-0 -z-10 bg-linear-to-br from-[#7a1f2a]/25 via-black/40 to-[#2d4f9e]/25 opacity-80" />
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Why this matters</h3>
              <p className="text-slate-100">
                COMPOSIT connects students, researchers, and industry across India. As a CA, you turn curiosity into participation—helping
                peers access mentorship, competitions, and breakthrough ideas in materials science.
              </p>
              <div className="grid grid-cols-2 gap-3 text-sm text-slate-100">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-xs uppercase tracking-wide text-white/70">Impact</p>
                  <p className="text-lg font-semibold text-white">10k+ participants</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-xs uppercase tracking-wide text-white/70">Legacy</p>
                  <p className="text-lg font-semibold text-white">Since 1994</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-xs uppercase tracking-wide text-white/70">Reach</p>
                  <p className="text-lg font-semibold text-white">India-wide</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-xs uppercase tracking-wide text-white/70">Network</p>
                  <p className="text-lg font-semibold text-white">60+ partners</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section className="grid gap-6 lg:grid-cols-2 lg:gap-10" initial={riseProps.initial} animate={riseProps.animate} transition={{ ...riseProps.transition, delay: 0.1 }}>
          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg backdrop-blur">
            <div className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#7a1f2a] to-[#2d4f9e] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              About COMPOSIT
            </div>
            <p className="text-slate-200 leading-relaxed">
              COMPOSIT is IIT Kharagpur’s flagship materials science fest. It unites students, professors, and industry experts to explore
              breakthroughs in metallurgy, sustainability, advanced manufacturing, and smart materials. As a CA, you carry this energy to
              your campus and make it accessible to your community.
            </p>
          </div>

          <div className="space-y-4 rounded-3xl border border-white/10 bg-linear-to-br from-[#7a1f2a]/20 via-black/40 to-[#2d4f9e]/25 p-8 shadow-lg backdrop-blur">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              Responsibilities
            </div>
            <ul className="space-y-3 text-slate-100">
              {responsibilities.map((item, idx) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:shadow-lg"
                >
                  <motion.div
                    className="flex items-start gap-3"
                    initial={riseProps.initial}
                    animate={riseProps.animate}
                    transition={{ ...riseProps.transition, delay: 0.08 + idx * 0.03 }}
                  >
                    <span className="mt-1 h-2.5 w-2.5 flex-none rounded-full bg-linear-to-br from-[#7a1f2a] to-[#2d4f9e]" aria-hidden />
                    <span>{item}</span>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        <motion.section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl" initial={riseProps.initial} animate={riseProps.animate} transition={{ ...riseProps.transition, delay: 0.15 }}>
          <div className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#7a1f2a] to-[#2d4f9e] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            Benefits
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {benefits.map((item, idx) => (
              <motion.div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:shadow-lg"
                initial={riseProps.initial}
                animate={riseProps.animate}
                transition={{ ...riseProps.transition, delay: 0.1 + idx * 0.04 }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl" initial={riseProps.initial} animate={riseProps.animate} transition={{ ...riseProps.transition, delay: 0.2 }}>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            FAQs
          </div>
          <div className="mt-4 space-y-3">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-white/20 hover:shadow-lg"
              >
                <summary className="flex cursor-pointer items-center justify-between text-white">
                  <span className="text-base font-semibold">{item.q}</span>
                  <span className="text-sm text-white/70 transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2 text-sm text-slate-200 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default CA
