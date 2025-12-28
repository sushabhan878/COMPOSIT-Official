import React from 'react'
import Image from 'next/image'

const AboutComposit = () => {
  return (
    <main className="relative w-full overflow-hidden py-20 mt-16 lg:py-28">
      <div className="mx-auto max-w-10xl px-[5vw]">
        {/* Header */}
        <div className="mb-12 space-y-3 text-center">
          <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            About COMPOSIT
          </h1>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
        </div>

        {/* Content + Image */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Text */}
          <div className="lg:col-span-7 space-y-6 text-base leading-relaxed text-gray-300 md:text-lg">
            <p>
              With Science and Technology running in the veins of today’s generation determined to push their talents to the edge only to take flight, COMPOSIT provides the perfect platform to knit those aspirations into a skyful of opportunities. Being one of the largest fests in the genre all over India, COMPOSIT, an abbreviation of Congress of Metallurgical Professionals involving Students, Industry, and Teachers, is one of India’s largest Materials Science Fest conducted by the Society of Metallurgical Engineers (SME), Indian Institute of Technology Kharagpur. It is a unique congregation of students, professionals, academicians, and eminent personalities sharing the belief that materials will define the next revolution, a path-breaking concept to compile and share knowledge and enthusiasm for the development of ‘The Science of Materials.
            </p>
            <p>
              Starting in 1994, It is a national congregation of bright and ambitious minds to invoke their innovation and bridge their ingenious thoughts and ideas into exorbitant assets for humanity. It also gives the young enthusiasts a chance to explore and showcase their talents and also interact with the stalwarts in the field who share their expertise. Compelled by the thirst for knowledge and adventure the exuberant minds, IIT Kharagpur is all set to conduct yet another edition of COMPOSIT, which promises an exciting odyssey embracing a plethora of events and all its trademark features.
            </p>
          </div>

          {/* Image */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl transition duration-300 hover:-translate-y-2 hover:shadow-amber-500/30">
              <Image
                src="https://res.cloudinary.com/dohx1bvom/image/upload/v1766904306/COMPOSIT_Brochure_2026_tivg2u.png"
                alt="Materials science at IIT Kharagpur — COMPOSIT"
                width={1200}
                height={800}
                className="h-full w-full scale-110 object-cover transition duration-300 hover:scale-125"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </div>

        {/* Theme Description */}
        <section className="mt-16 lg:mt-24">
          <div className="mb-8 space-y-2">
            <h2 className="text-2xl font-bold text-white md:text-3xl">Mischmetal Mystique — Unveiling the Mysteries of Rare Earth Materials</h2>
            <div className="h-1 w-20 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
          </div>
          <p className="max-w-4xl text-base text-gray-300 md:text-lg">
            Mischmetal Mystique explores the fascinating world of rare earth elements and their integral role in shaping modern technology and sustainable innovation. From high-performance magnets and advanced electronics to clean energy systems and next-generation transportation, rare earths quietly power global progress. This theme highlights their science, applications, and strategic importance—while surfacing the challenges of responsible extraction, supply resilience, and circularity.
          </p>
          <p className="mt-4 max-w-4xl text-base text-gray-300 md:text-lg">
            We invite participants to unravel how critical elements enable breakthroughs in EV motors, wind turbines, energy-efficient lighting, and advanced communication systems—and to imagine future applications that keep materials science at the heart of a resilient, energy-efficient, and technologically advanced world.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-white/5 p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-lg hover:shadow-amber-400/20">
              <h3 className="text-lg font-semibold text-white">Critical Materials</h3>
              <p className="mt-2 text-sm text-gray-300">Nd, Dy, Tb, and more—rare earths enabling high-performance magnets, sensors, and advanced devices.</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-lg hover:shadow-amber-400/20">
              <h3 className="text-lg font-semibold text-white">Clean Energy</h3>
              <p className="mt-2 text-sm text-gray-300">Powering EV motors, wind turbines, and efficient lighting for a low-carbon future.</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-lg hover:shadow-amber-400/20">
              <h3 className="text-lg font-semibold text-white">Sustainable Extraction</h3>
              <p className="mt-2 text-sm text-gray-300">Exploring responsible mining, recycling, and circular supply chains for critical minerals.</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-lg hover:shadow-amber-400/20">
              <h3 className="text-lg font-semibold text-white">Future Applications</h3>
              <p className="mt-2 text-sm text-gray-300">Next-gen communications, aerospace, and quantum technologies driven by rare earth innovation.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default AboutComposit
