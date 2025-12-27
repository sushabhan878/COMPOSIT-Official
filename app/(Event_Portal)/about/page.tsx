import React from 'react'
import Image from 'next/image'

const AboutComposit = () => {
  return (
    <main className="relative w-full overflow-hidden py-20 lg:py-28">
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
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80&auto=format&fit=crop"
                alt="Materials science at IIT Kharagpur — COMPOSIT"
                width={1200}
                height={800}
                className="h-full w-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </div>

        {/* Theme Description */}
        <section className="mt-16 lg:mt-24">
          <div className="mb-8 space-y-2">
            <h2 className="text-2xl font-bold text-white md:text-3xl">Theme 2026: Materials Beyond Boundaries</h2>
            <div className="h-1 w-20 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
          </div>
          <p className="max-w-4xl text-base text-gray-300 md:text-lg">
            COMPOSIT 2026 celebrates materials as the engine of breakthrough innovation — spanning space technologies, sustainable manufacturing, biomedical devices, energy systems, and intelligent composites. The theme highlights how interdisciplinary collaboration transforms raw ideas into real-world impact.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-white/5 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white">Innovation</h3>
              <p className="mt-2 text-sm text-gray-300">Frontier research driving next-gen alloys, polymers, ceramics, and meta-materials.</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white">Sustainability</h3>
              <p className="mt-2 text-sm text-gray-300">Circular design, low-carbon processes, and resilient supply chains.</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white">Interdisciplinarity</h3>
              <p className="mt-2 text-sm text-gray-300">Bridging materials with AI, biotech, aerospace, and energy.</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white">Impact</h3>
              <p className="mt-2 text-sm text-gray-300">From lab to market: prototypes, pilots, and partnerships.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default AboutComposit
