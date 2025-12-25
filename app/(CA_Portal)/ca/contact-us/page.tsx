import React from 'react'
import ContactCard from '@/components/ContactCard'

const contacts = [
  {
    name: 'Aarav Sen',
    position: 'Head Coordinator',
    email: 'aarav.sen@kgp.composit.in',
    contact: '+91 90000 00001',
    linkedin: 'https://www.linkedin.com',
    imageUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Ishita Rao',
    position: 'PR & Outreach',
    email: 'ishita.rao@kgp.composit.in',
    contact: '+91 90000 00002',
    linkedin: 'https://www.linkedin.com',
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Rohan Mehta',
    position: 'Industry Relations',
    email: 'rohan.mehta@kgp.composit.in',
    contact: '+91 90000 00003',
    linkedin: 'https://www.linkedin.com',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {contacts.map((person) => (
            <ContactCard key={person.email} {...person} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContactUs
