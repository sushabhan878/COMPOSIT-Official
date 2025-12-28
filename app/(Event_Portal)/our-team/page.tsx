"use client"
import ProfileCard from '@/components/ProfileCard'
import React from 'react'
import { motion } from 'framer-motion'

const headsData = [
  {
    name: 'Itisha Roy',
    position: 'General Secretary',
    imageUrl: 'https://res.cloudinary.com/dohx1bvom/image/upload/v1766670891/WhatsApp_Image_2025-12-25_at_12.15.22_prmis2.jpg',
    linkedin: 'https://www.linkedin.com/in/itisha-roy-284985287/',
    instagram: 'https://www.instagram.com/my_humor_sucks_/',
    email: 'itisha@composit.in',
    contactNo: '+91-9883908829',
    description: 'Overseeing overall operations and strategic direction of COMPOSIT 2026. Committed to delivering excellence.',
  },
  {
    name: 'Omkar Prajapati',
    position: 'General Secretary',
    imageUrl: 'https://res.cloudinary.com/dohx1bvom/image/upload/v1766670891/1741552440328_jdmiv4.jpg',
    linkedin: 'https://www.linkedin.com/in/omkar-prajapati-05810a297/',
    instagram: 'https://www.instagram.com/omkar_prajapati_24/',
    email: 'omkar@composit.in',
    contactNo: '+91-8917073738',
    description: 'Steering the vision and mission of COMPOSIT. Dedicated to fostering innovation and collaboration.',
  },
  {
    name: 'Sushabhan Majumdar',
    position: 'Head - Web & Sponsorship',
    imageUrl: 'https://res.cloudinary.com/dohx1bvom/image/upload/v1766856999/Suite_Profile_Pic_uwedgk.png',
    linkedin: 'https://www.linkedin.com/in/sushabhan-majumdar-099564292/',
    instagram: 'https://www.instagram.com/sushabhan_878_/',
    email: 'sushabhan@composit.in',
    contactNo: '+91-9732550799',
    description: 'Building robust digital presence and securing strategic partnerships for COMPOSIT.',
  },
  {
    name: 'Jitam Barman',
    position: 'Head - Sponsorship',
    imageUrl: 'https://res.cloudinary.com/dohx1bvom/image/upload/v1766857694/1759955207051_tgyvzt.jpg',
    linkedin: 'https://www.linkedin.com/in/jitam-barman/',
    instagram: 'https://www.instagram.com/jitam_b/',
    email: 'jitam@composit.in',
    contactNo: '+91-9547902200',
    description: 'Forging industry partnerships and securing financial support for the festival\'s success.',
  },
  {
    name: 'Vijendra Singh Shyam',
    position: 'Head - Design & Media',
    imageUrl: 'https://res.cloudinary.com/dohx1bvom/image/upload/v1766857694/1745933651994_wvx09x.jpg ',
    linkedin: 'https://www.linkedin.com/in/vijendra-singh-shyam-360131283/',
    instagram: 'https://www.instagram.com/vizzu_2/',
    email: 'vijendra@composit.in',
    contactNo: '+91-9981723334',
    description: 'Crafting compelling visual narratives and managing brand communication across all platforms.',
  },
  {
    name: 'Debarshini Mondal',
    position: 'Head - Events',
    imageUrl: 'https://res.cloudinary.com/dohx1bvom/image/upload/v1766857852/1722867973882_fdemjf.jpg',
    linkedin: 'https://www.linkedin.com/in/debarshini-mondal-0758a0231/',
    instagram: 'https://www.instagram.com/_debarshini_/',
    email: 'debarshini@composit.in',
    contactNo: '+91-9933163116',
    description: 'Orchestrating dynamic events and creating unforgettable experiences for all participants.',
  },
  {
    name: 'Jayesh Andhale',
    position: 'Head - Events & PR',
    imageUrl: 'https://res.cloudinary.com/dohx1bvom/image/upload/v1766670890/WhatsApp_Image_2025-12-25_at_12.02.38_rzi98q.jpg',
    linkedin: 'https://www.linkedin.com/in/jayesh-andhale-2638b9287/',
    instagram: 'https://www.instagram.com/jayesh_andhale/',
    email: 'jayesh@composit.in',
    contactNo: '+91-9767922637',
    description: 'Coordinating event logistics and building public relations strategy to amplify COMPOSIT\'s impact.',
  },
  {
    name: 'Ayush Ogale',
    position: 'Head - Events & PR',
    imageUrl: 'https://res.cloudinary.com/dohx1bvom/image/upload/v1766670889/1750253720690_e1g09k.jpg',
    linkedin: 'https://www.linkedin.com/in/ayush-ogale-9b449528a/',
    instagram: 'https://www.instagram.com/ayushr.og/',
    email: 'ayush@composit.in',
    contactNo: '+91-8167069056',
    description: 'Driving event innovation and crafting compelling public narratives for COMPOSIT.',
  },
]

const Team = () => {
  return (
    <main className="relative min-h-screen bg-gradient-to-b lg:py-28">
      <div className="mx-auto max-w-10xl px-[5vw]">

        {/* Faculty Advisors */}
        <section className="space-y-12 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
            className="space-y-2 text-center"
          >
            <h2 className="text-2xl font-bold text-white md:text-3xl">Faculty Advisors</h2>
            <div className="mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-1 md:grid-cols-2 items-center justify-items-center lg:mr-60 lg:ml-60 gap-8"
          >
            {[{
              imageUrl: "https://res.cloudinary.com/dohx1bvom/image/upload/v1766858327/AmlanDutta.cebd0cf0bae6d57b1429_xpifq3.jpg",
              name: "Prof. Amlan Datta",
              position: "Faculty Advisor",
              linkedin: "https://www.linkedin.com/in/amlan-dutta-a108a8148/",
              email: "amlan.dutta@metal.iitkgp.ac.in",
              description: "Guiding COMPOSIT's strategic vision and academic excellence. Instrumental in shaping the festival's core values and ensuring world-class standards.",
            }, {
              imageUrl: "https://res.cloudinary.com/dohx1bvom/image/upload/v1766858328/Sankha_profile.688a415f27fd5df569fb_zpcx3m.jpg",
              name: "Prof. Sankha Mukherjee",
              position: "Faculty Advisor",
              linkedin: "https://www.linkedin.com/in/sankha-m-913867161/",
              email: "sankha@metal.iitkgp.ac.in",
              description: "Mentoring the entire team and fostering innovation at every level. Committed to building a sustainable legacy through COMPOSIT.",
            }].map((advisor) => (
              <motion.div key={advisor.name} variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}>
                <ProfileCard {...advisor} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Governors */}
        <section className="mt-20 space-y-12">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold text-white md:text-3xl">Governors</h2>
            <div className="mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-items-center lg:mr-60 lg:ml-60 gap-8">
            <ProfileCard
              imageUrl="https://res.cloudinary.com/dohx1bvom/image/upload/v1766858576/1759917747528_saeklg.jpg"
              name="Krishna Chaudhari"
              position="Governor"
              linkedin="https://www.linkedin.com/in/krishachaudhari/"
              instagram="https://www.instagram.com/krish.g_d/"
              email="krishnachaudhari2309@gmail.com"
              contactNo="+91-8767650199"
              description="Leading with strategic expertise and proven management acumen. Bringing years of industry experience to guide COMPOSIT's success."
            />
            <ProfileCard
              imageUrl="https://res.cloudinary.com/dohx1bvom/image/upload/v1766858576/1732958709166_kiyl4k.jpg"
              name="Deven Shinde"
              position="Governor"
              linkedin="https://www.linkedin.com/in/deven-shinde-6b3687259/"
              instagram="https://www.instagram.com/deven_shinde_29/"
              email="devenshinde346@gmail.com"
              contactNo="+91-7057101469"
              description="Steering the team with visionary leadership and exceptional organizational skills. Driving excellence through decisive management."
            />
          </div>
        </section>

        {/* Heads */}
        <section className="mt-20 space-y-12">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold text-white md:text-3xl">Heads</h2>
            <div className="mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4 space-y-20">
            {headsData.map((head) => (
              <ProfileCard
                key={head.name}
                imageUrl={head.imageUrl}
                name={head.name}
                position={head.position}
                linkedin={head.linkedin}
                instagram={head.instagram}
                email={head.email}
                contactNo={head.contactNo}
                description={head.description}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export default Team
