"use client"
import React from 'react'
import { motion } from 'framer-motion'

const ContactUs = () => {
  const contactInfo = [
    {
      title: 'Email',
      value: 'composit.iit@gmail.com',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      href: 'mailto:composit.iit@gmail.com',
    },
    {
      title: 'Phone 1',
      value: '+91-9883908829',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      href: 'tel:+919883908829',
    },
    {
      title: 'Phone 2',
      value: '+91-8917073738',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      href: 'tel:+918917073738',
    },
    {
      title: 'Address',
      value: 'IIT Kharagpur, West Bengal 721302, India',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      href: 'https://maps.google.com/?q=IIT+Kharagpur',
    },
  ]

  return (
    <main className="mt-20 min-h-screen py-16 lg:py-24">
      <div className="mx-auto max-w-10xl px-[5vw]">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-10 space-y-3 text-center"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-amber-300/80">GET IN TOUCH</p>
          <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">Contact Us</h1>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {contactInfo.map((info, idx) => (
              <motion.a
                key={info.title}
                href={info.href}
                target={info.title === 'Address' ? '_blank' : undefined}
                rel={info.title === 'Address' ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 + idx * 0.1 }}
                className="group relative flex items-start gap-4 overflow-hidden rounded-3xl bg-white/5 p-6 shadow-2xl backdrop-blur ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-amber-500/20"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-400 ring-1 ring-amber-400/20 transition-all duration-300 group-hover:bg-amber-400 group-hover:text-black group-hover:shadow-lg group-hover:shadow-amber-400/50">
                  {info.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60">{info.title}</h3>
                  <p className="mt-1 text-lg font-medium text-white">{info.value}</p>
                </div>
                <div className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.a>
            ))}

            {/* Query text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="rounded-3xl bg-white/5 p-6 shadow-2xl backdrop-blur ring-1 ring-white/10"
            >
              <h3 className="mb-2 text-lg font-semibold text-white">Have a question, idea, or collaboration in mind?</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                We'd love to hear from you. Reach out to the COMPOSIT team for queries related to events, partnerships, sponsorships, or general information. Our team is always happy to assist you.
              </p>
            </motion.div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative overflow-hidden rounded-3xl bg-white/5 shadow-2xl backdrop-blur ring-1 ring-white/10"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.6738447809147!2d87.30969931495762!3d22.31893448532588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1d440c4f6c8a49%3A0xa1c0e7a9b3e5f9e8!2sIndian%20Institute%20of%20Technology%20Kharagpur!5e0!3m2!1sen!2sin!4v1640000000000!5m2!1sen!2sin"
              width="100%"
              height="626"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
              title="IIT Kharagpur Location"
            />
          </motion.div>
        </div>
      </div>
    </main>
  )
}

export default ContactUs

