import React from 'react'
import ContactCard from '@/components/ContactCard'

const contacts = [
  {
    name: 'Itisha Roy',
    position: 'General Secretary',
    email: 'itisha@composit.in',
    contact: '+91 9883908829',
    linkedin: 'https://www.linkedin.com/in/itisha-roy-284985287?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    imageUrl: 'https://res.cloudinary.com/dohx1bvom/image/upload/v1766670891/WhatsApp_Image_2025-12-25_at_12.15.22_prmis2.jpg',
  },
  {
    name: 'Omkar Prajapati',
    position: 'General Secretary',
    email: 'omkar@composit.in',
    contact: '+91 8917073738',
    linkedin: 'https://www.linkedin.com/in/omkar-prajapati-05810a297/',
    imageUrl: 'https://res.cloudinary.com/dohx1bvom/image/upload/v1766670891/1741552440328_jdmiv4.jpg',
  },
  {
    name: 'Jayesh Andhale',
    position: 'Public Relations Head',
    email: 'jayesh@composit.in',
    contact: '+91 9767922637',
    linkedin: 'https://www.linkedin.com/in/jayesh-andhale-2638b9287?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    imageUrl: 'https://res.cloudinary.com/dohx1bvom/image/upload/v1766670890/WhatsApp_Image_2025-12-25_at_12.02.38_rzi98q.jpg',
  },
  {
    name: 'Ayush Ogale',
    position: 'Public Relations Head',
    email: 'ayush@composit.in',
    contact: '+91 8167069056',
    linkedin: 'https://www.linkedin.com/in/ayush-ogale-9b449528a/',
    imageUrl: 'https://res.cloudinary.com/dohx1bvom/image/upload/v1766670889/1750253720690_e1g09k.jpg',
  },
]

const ContactUs = () => {
  return (
    <div className="relative isolate overflow-hidden text-slate-50 mt-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 sm:px-8 lg:px-12 lg:py-20">
        <header className="space-y-3 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#7a1f2a]/80 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white ring-1 ring-white/10">
            Contact Us
          </span>
          <h1 className="text-3xl font-semibold sm:text-4xl">We would love to hear from you</h1>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-slate-200">
            Reach out to the COMPOSIT team for partnerships, campus outreach, or event queries. We are quick to respond and happy to help.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {contacts.map((person) => (
            <ContactCard key={person.email} {...person} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContactUs
