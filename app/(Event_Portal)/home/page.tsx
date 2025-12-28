"use client"
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import StatsSection from './StatsSection'

const HomePage = () => {
  return (
    <>
    <section className="mt-16 relative isolate min-h-screen w-full overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster="https://images.pexels.com/photos/274744/pexels-photo-274744.jpeg?auto=compress&cs=tinysrgb&h=720"
      >
        <source src="https://videos.pexels.com/video-files/7131670/7131670-hd_1920_1080_25fps.mp4" type="video/mp4" />
      </video>

      <div className="relative flex min-h-screen flex-col items-start justify-center gap-6 px-[5vw] py-24 text-left text-white lg:px-[5vw]">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="text-xs uppercase tracking-[0.35em] text-gray-300"
        >
          IIT Kharagpur • COMPOSIT 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="text-balance text-4xl font-semibold leading-tight drop-shadow md:text-3xl lg:text-5xl"
        >
          Ready to experiencem <span className="text-balance text-4xl font-semibold leading-tight drop-shadow md:text-5xl lg:text-6xl underline decoration-amber-400 decoration-4 underline-offset-4 transition-colors duration-300 hover:text-amber-200">COMPOSIT 2026?</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
          className="max-w-3xl text-pretty text-base text-gray-200 md:text-lg"
        >
          A three-day celebration of materials innovation, future-forward research, and the brightest student talent. Dive into
          marquee competitions, flagship talks, and immersive exhibitions that keep COMPOSIT the heartbeat of campus energy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          className="flex flex-wrap items-center gap-3 text-sm md:text-base"
        >
          <span className="rounded-full bg-white/10 px-4 py-2 backdrop-blur mr-4 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-400/20">Location: IIT Kharagpur</span>
          <span className="rounded-full bg-white/10 px-4 py-2 backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-400/20">Dates: 27-29 March 2026</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.25 }}
          className="mt-4 md:mt-36 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/signup"
            className="rounded-full bg-amber-400 px-6 py-3 text-base font-semibold text-slate-900 shadow-lg shadow-amber-400/30 transition-transform duration-300 hover:-translate-y-1 hover:shadow-amber-400/50 lg:px-8 lg:py-4 lg:text-lg"
          >
            Get your pass
          </Link>

          <Link
            href="/about"
            className="rounded-full border border-white/50 px-6 py-3 text-base font-semibold text-white transition-transform duration-300 hover:-translate-y-1 hover:border-amber-300 hover:bg-white/10 hover:text-amber-100 lg:px-8 lg:py-4 lg:text-lg"
          >
            Explore events
          </Link>
        </motion.div>
      </div>
    </section>

    {/* Motto and Vision Section */}
    <section className="relative w-full overflow-hidden py-20 lg:py-18">
      <div className="mx-auto max-w-10xl px-[5vw]">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text Content */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                Our Motto & Vision
              </h2>
              <div className="h-1 w-24 rounded-full bg-gradient-to-r from-amber-400 to-orange-500"></div>
            </div>

            <div className="space-y-6 text-base leading-relaxed text-gray-300 md:text-lg">
              <p>
                Materials science has shaped the development of civilizations since the dawn of mankind. From the atomic level to high engineering structures or the greatest space endeavors, material science is intrinsically diffused in every aspect of human advancement.
              </p>
              <p>
                With the aim of raising consciousness on materials science across the nation, COMPOSIT strives to nurture and enrich interest in material science and metallurgy among the students of the nation and explore tremendous possibilities of future applications of materials science in space technology due to their multi-functionality and diverse properties.
              </p>
              <p>
                It furnishes a chance for entrepreneurs, industrialists, teaching professionals, and students to experience the wide beauty and nature of materials. We seek to spread awareness about material science-driven innovation in research and industry in everything from aerospace to medicine.
              </p>
            </div>
          </div>

          {/* Bento Grid Image Layout */}
          <div className="relative grid grid-cols-8 auto-rows-[80px] gap-4 h-[640px]">
            {/* Image 1 - Large Feature Top */}
            <div className="relative col-span-5 row-span-4 overflow-hidden rounded-3xl shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-amber-500/30 hover:z-10">
              <Image
                src="https://res.cloudinary.com/dohx1bvom/image/upload/v1766911450/R_vmassg.jpg"
                alt="Materials Science Research"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            </div>

            {/* Image 2 - Tall Right */}
            <div className="relative col-span-3 col-start-6 row-span-5 overflow-hidden rounded-3xl shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-amber-500/30 hover:z-10">
              <Image
                src="https://res.cloudinary.com/dohx1bvom/image/upload/v1766911451/1FOJA0O7PHUO32foz1gr.width-1280_oat07f.jpg"
                alt="Aerospace Materials"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            </div>

            {/* Image 3 - Medium Square */}
            <div className="relative col-span-3 row-span-3 row-start-5 overflow-hidden rounded-3xl shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-amber-500/30 hover:z-10">
              <Image
                src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&q=80"
                alt="Metallurgy Innovation"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            </div>

            {/* Image 4 - Wide Bottom */}
            <div className="relative col-span-5 col-start-4 row-span-3 row-start-6 overflow-hidden rounded-3xl shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-amber-500/30 hover:z-10">
              <Image
                src="https://res.cloudinary.com/dohx1bvom/image/upload/v1766911449/OIP_farr3j.webp"
                alt="Space Technology"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl pointer-events-none animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl pointer-events-none animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>

    {/* Activities Section */}
    <section className="relative w-full overflow-hidden py-20 lg:py-32">
      <div className="mx-auto max-w-10xl px-[5vw]">
        {/* Section Header */}
        <div className="mb-16 space-y-4 text-center">
          <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            What We Offer
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-amber-400 to-orange-500"></div>
          <p className="mx-auto max-w-2xl text-base text-gray-400 md:text-lg">
            Experience a diverse range of activities designed to enrich your knowledge and skills
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Competitions Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm transition-all duration-300 hover:scale-[1.04] hover:from-white/10 hover:to-white/5 hover:shadow-2xl hover:shadow-amber-500/20"
          >
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-xl transition-all duration-300 group-hover:bg-amber-400/30"></div>
                <div className="relative rounded-full bg-gradient-to-br from-amber-400/20 to-orange-500/20 p-6 transition-all duration-300 group-hover:from-amber-400/30 group-hover:to-orange-500/30">
                  <svg className="h-12 w-12 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-amber-400">Competitions</h3>
              <p className="text-sm leading-relaxed text-gray-300">
                A multitude of events ranging from mesmerizing data analytics, stunning photography, compelling case studies and engaging research competitions, unleashing your full potential and developing a spirit of healthy competitiveness.
              </p>
            </div>
          </motion.div>

          {/* Guest Lectures Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm transition-all duration-300 hover:scale-[1.04] hover:from-white/10 hover:to-white/5 hover:shadow-2xl hover:shadow-amber-500/20"
          >
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-xl transition-all duration-300 group-hover:bg-amber-400/30"></div>
                <div className="relative rounded-full bg-gradient-to-br from-amber-400/20 to-orange-500/20 p-6 transition-all duration-300 group-hover:from-amber-400/30 group-hover:to-orange-500/30">
                  <svg className="h-12 w-12 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-amber-400">Guest Lectures</h3>
              <p className="text-sm leading-relaxed text-gray-300">
                Deliverance of guest lectures by eminent professionals in the field of Materials Science, enriching your learning experience and broadening your horizons.
              </p>
            </div>
          </motion.div>

          {/* Workshops Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm transition-all duration-300 hover:scale-[1.04] hover:from-white/10 hover:to-white/5 hover:shadow-2xl hover:shadow-amber-500/20"
          >
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-xl transition-all duration-300 group-hover:bg-amber-400/30"></div>
                <div className="relative rounded-full bg-gradient-to-br from-amber-400/20 to-orange-500/20 p-6 transition-all duration-300 group-hover:from-amber-400/30 group-hover:to-orange-500/30">
                  <svg className="h-12 w-12 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-amber-400">Workshops</h3>
              <p className="text-sm leading-relaxed text-gray-300">
                Conductance of informative workshops on captivating concepts, providing you with hands-on experience and practical knowledge about cutting-edge research and innovations in the field of materials and beyond.
              </p>
            </div>
          </motion.div>

          {/* Webinars Card */}
          <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:from-white/10 hover:to-white/5 hover:shadow-2xl hover:shadow-amber-500/20">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-xl transition-all duration-300 group-hover:bg-amber-400/30"></div>
                <div className="relative rounded-full bg-gradient-to-br from-amber-400/20 to-orange-500/20 p-6 transition-all duration-300 group-hover:from-amber-400/30 group-hover:to-orange-500/30">
                  <svg className="h-12 w-12 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-amber-400">Webinars</h3>
              <p className="text-sm leading-relaxed text-gray-300">
                A plethora of engrossing webinars, providing a platform to interact with prominent persnalities including Material Scientists and Professionals from all across the globe and to gain valuable insights about the field of Materials Science and beyond.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Stats Section */}
    <StatsSection />
    </>
  )
}

export default HomePage
