"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const tiers = [
  {
    name: "Title Sponsor",
    price: "Rs. 2,00,000",
    accent: "from-amber-400 to-orange-500",
    perks: [
      "Monster Gate",
      "Monster Heading",
      "Banners",
      "After Movie + Trailers + Teasers",
      "Website Hyperlink (3 years)",
      "Backdrops",
      "Magazines",
      "Arena Publicity",
      "Pole Boards",
      "Standees",
      "Social Media",
      "Flag",
      "Newspaper",
      "Flyers",
      "Reels",
      "Audience Engagement",
      "Campus Ambassador (CA)",
    ],
  },
  {
    name: "Major Sponsors",
    price: "Rs. 1,25,000",
    accent: "from-purple-400 to-pink-500",
    perks: [
      "Monster Heading",
      "Banners",
      "After Movie + Trailers + Teasers",
      "Website Hyperlink (3 years)",
      "Backdrops",
      "Arena Publicity",
      "Pole Boards",
      "Standees",
      "Social Media",
      "Flag",
      "Newspaper",
      "Flyers",
      "Reels",
      "Audience Engagement",
      "Campus Ambassador (CA)",
    ],
  },
  {
    name: "Event Sponsors",
    price: "Rs. 50,000",
    accent: "from-cyan-400 to-emerald-500",
    perks: [
      "Banners",
      "After Movie + Trailers + Teasers",
      "Website Hyperlink (3 years)",
      "Arena Publicity",
      "Social Media",
      "Flyers",
      "Reels",
      "Audience Engagement",
      "Campus Ambassador (CA)",
    ],
  },
];

const benefits = [
  "Monster Gate",
  "Monster Heading",
  "Banners",
  "After Movie + Trailers + Teasers",
  "Website Hyperlink (3 years)",
  "Backdrops",
  "Magazines",
  "Arena Publicity",
  "Pole Boards",
  "Standees",
  "Social Media",
  "Flag",
  "Newspaper",
  "Flyers",
  "Reels",
  "Audience Engagement",
  "Campus Ambassador (CA)",
];

const sponsorLogos = [
  "https://res.cloudinary.com/dohx1bvom/image/upload/v1766922628/COMPOSIT_Brochure_2026_1_ykwugg.png",
  "https://res.cloudinary.com/dohx1bvom/image/upload/v1766922624/Screenshot_2025-12-28_171853_zmxqf1.png",
  "https://res.cloudinary.com/dohx1bvom/image/upload/v1766922624/Screenshot_2025-12-28_171832_uj4lor.png",
  "https://res.cloudinary.com/dohx1bvom/image/upload/v1766922622/Screenshot_2025-12-28_171804_sao3be.png",
  "https://res.cloudinary.com/dohx1bvom/image/upload/v1766922621/Screenshot_2025-12-28_171736_fl9in4.png",
  "https://res.cloudinary.com/dohx1bvom/image/upload/v1766922620/Screenshot_2025-12-28_171707_mb0lxf.png",
  "https://res.cloudinary.com/dohx1bvom/image/upload/v1766922617/Screenshot_2025-12-28_171620_y2pwjc.png",
  "https://res.cloudinary.com/dohx1bvom/image/upload/v1766922616/Screenshot_2025-12-28_171417_kkut58.png",
  "https://res.cloudinary.com/dohx1bvom/image/upload/v1766922616/Screenshot_2025-12-28_171442_uklamn.png",
  "https://res.cloudinary.com/dohx1bvom/image/upload/v1766922616/Screenshot_2025-12-28_171402_ot1kyv.png",
  "https://res.cloudinary.com/dohx1bvom/image/upload/v1766922615/Screenshot_2025-12-28_171345_tudbrq.png",
  "https://res.cloudinary.com/dohx1bvom/image/upload/v1766922610/Screenshot_2025-12-28_171311_k2dwyp.png",
  "https://res.cloudinary.com/dohx1bvom/image/upload/v1766922610/Screenshot_2025-12-28_171327_c73biw.png",
  "https://res.cloudinary.com/dohx1bvom/image/upload/v1766922610/Screenshot_2025-12-28_171252_rax8mm.png",
  "https://res.cloudinary.com/dohx1bvom/image/upload/v1766922609/Screenshot_2025-12-28_171236_jwbvir.png",
  "https://res.cloudinary.com/dohx1bvom/image/upload/v1766922609/Screenshot_2025-12-28_171223_vwpdy6.png",
  "https://res.cloudinary.com/dohx1bvom/image/upload/v1766922590/Screenshot_2025-12-28_171211_aargqb.png",
  "https://res.cloudinary.com/dohx1bvom/image/upload/v1766922590/Screenshot_2025-12-28_171142_clti9a.png",
  "https://res.cloudinary.com/dohx1bvom/image/upload/v1766922590/Screenshot_2025-12-28_171154_pnyxfe.png",
  "https://res.cloudinary.com/dohx1bvom/image/upload/v1766922589/Screenshot_2025-12-28_171050_xhiqsh.png",
  "https://res.cloudinary.com/dohx1bvom/image/upload/v1766922589/Screenshot_2025-12-28_171126_sz98fj.png",
  "https://res.cloudinary.com/dohx1bvom/image/upload/v1766922589/Screenshot_2025-12-28_171037_bysvdg.png",
  "https://res.cloudinary.com/dohx1bvom/image/upload/v1766922589/Screenshot_2025-12-28_171023_jlcdsr.png",
  "https://res.cloudinary.com/dohx1bvom/image/upload/v1766922589/Screenshot_2025-12-28_171008_fv2dat.png",
  "https://res.cloudinary.com/dohx1bvom/image/upload/v1766922589/Screenshot_2025-12-28_171112_atixby.png",
  "https://res.cloudinary.com/dohx1bvom/image/upload/v1766922588/Screenshot_2025-12-28_170957_h2nwna.png",
];

const Check = () => (
  <svg
    className="h-5 w-5 text-amber-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const Sponsorships = () => {
  const loopedLogos = [...sponsorLogos, ...sponsorLogos];

  return (
    <main className="relative mt-20 min-h-screen py-20 lg:py-28">
      <div className="mx-auto max-w-10xl px-[5vw]">
        <div className="mb-4 text-white">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-300/80">
            Previous Sponsors
          </p>
        </div>
        <div className="relative mb-12 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-orange-500/10 blur-xl" />
          <motion.div
            className="flex min-w-max gap-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          >
            {loopedLogos.map((logo, idx) => (
              <div
                key={logo + idx}
                className="flex h-36 w-auto flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 transition duration-200 hover:-translate-y-1 hover:ring-amber-400/60 hover:shadow-amber-400/30 hover:shadow-lg"
              >
                <img
                  src={logo}
                  alt={`Sponsor logo ${idx + 1}`}
                  className="h-full w-auto object-contain opacity-90"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hero */}
        <div className="mb-14 grid items-center gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-300/80">
              Sponsorship 2026
            </p>
            <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              Partner with COMPOSIT
            </h1>
            <p className="text-base text-gray-300 md:text-lg">
              Join us to power India’s premier materials science fest. Amplify
              your brand across campus and digital arenas with high-impact
              placements, media integrations, and exclusive visibility.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="https://mail.google.com/mail/?view=cm&to=sushabhan@composit.in&su=Sponsorship%20Enquiry&body=Hi%20COMPOSIT%20Team%2C%0A%0AWe%27re%20interested%20in%20sponsoring.%20Please%20share%20the%20next%20steps.%0A%0AThanks!"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-amber-400 px-6 py-3.5 text-base font-semibold text-black shadow-lg shadow-amber-500/30 transition hover:-translate-y-0.5 hover:shadow-amber-500/40"
              >
                Become a Sponsor
              </Link>
              <a
                href="https://wa.me/+919732550799"
                className="rounded-full border border-white/30 px-6 py-3.5 text-base font-semibold text-white transition hover:border-amber-400 hover:text-amber-300"
              >
                Talk to us
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-white/0 p-6 shadow-2xl backdrop-blur"
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl" />
            <div className="absolute -left-12 -bottom-12 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl" />
            <div className="relative space-y-3 text-white">
              <p className="text-sm font-semibold text-amber-300">
                Branding Avenues
              </p>
              <h3 className="text-2xl font-bold">
                Visibility that travels from arena to aftermovie
              </h3>
              <p className="text-sm text-gray-200">
                Feature on gates, headings, banners, teasers, website links,
                social reels, and campus touchpoints. Multi-channel reach
                designed to keep your brand in the spotlight.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Tiers */}
        {/* <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group relative overflow-hidden rounded-3xl bg-white/5 p-6 shadow-2xl backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-amber-500/20"
            >
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${tier.accent}`} />
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-amber-200">{tier.price}</span>
              </div>

              <div className="mt-4 space-y-3">
                {tier.perks.slice(0, 6).map((perk) => (
                  <div key={perk} className="flex items-start gap-2 text-sm text-gray-200">
                    <Check />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-amber-300 opacity-0 transition duration-200 group-hover:opacity-100">
                <span>+ more visibility benefits</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div> */}

        {/* Comparison Table */}
        {/* <section className="mt-16 space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold text-white md:text-3xl">Branding Avenues Table</h2>
            <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl backdrop-blur">
            <div className="grid grid-cols-4 bg-white/5 text-sm font-semibold text-white">
              <div className="px-4 py-3 text-left">Benefits</div>
              {tiers.map((tier) => (
                <div key={tier.name} className="px-4 py-3 text-center">
                  <div>{tier.name}</div>
                  <div className="text-amber-300 text-xs">{tier.price}</div>
                </div>
              ))}
            </div>

            <div className="divide-y divide-white/5 text-sm text-gray-200">
              {benefits.map((benefit) => (
                <div key={benefit} className="grid grid-cols-4 items-center">
                  <div className="px-4 py-3">{benefit}</div>
                  {tiers.map((tier) => (
                    <div key={tier.name + benefit} className="flex items-center justify-center px-4 py-3">
                      {tier.perks.includes(benefit) ? (
                        <span className="rounded-full bg-white/10 p-1">
                          <Check />
                        </span>
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* CTA */}
        {/* <div className="mt-16 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 px-6 py-6 shadow-lg backdrop-blur">
          <div className="space-y-1 text-white">
            <p className="text-sm uppercase tracking-[0.25em] text-amber-300/80">Let’s collaborate</p>
            <h3 className="text-xl font-semibold">Custom packages for your brand goals</h3>
            <p className="text-sm text-gray-300">Need a bespoke mix? We’ll tailor placements to maximize your ROI.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:sponsorships@composit.in"
              className="rounded-full bg-amber-400 px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-amber-500/30 transition hover:-translate-y-0.5 hover:shadow-amber-500/40"
            >
              Mail us
            </a>
            <a
              href="tel:+919999999999"
              className="rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:border-amber-400 hover:text-amber-300"
            >
              Call now
            </a>
          </div>
        </div> */}
      </div>
    </main>
  );
};

export default Sponsorships;
