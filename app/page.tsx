import React from 'react'
import LandingPage from '@/components/LandingPage';
import CountDown from '@/components/CountDown';
import Link from 'next/link';

const page = () => {
  return (
    <main className='relative w-full h-screen overflow-hidden'>
      {/* Full-screen background landing page */}
      <LandingPage />
      
      {/* Countdown positioned in bottom right corner */}
      <div className='absolute bottom-5 right-5 z-10 pointer-events-none'>
        <CountDown />
      </div>

      {/* Button for Pre-Fest Access
      <Link href="/about">
        <button className="absolute top-[5rem] left-[938px] transform -translate-x-1/2 z-10 pointer-events-auto opacity-20 bg-red-700 text-white px-1 py-0 text-xs rounded-lg shadow-lg hover:bg-red-800 transition cursor-pointer">About composit button</button>
      </Link>

      <Link href="/our-team">
        <button className="absolute top-[5rem] left-[1085px] transform -translate-x-1/2 z-10 pointer-events-auto opacity-20 bg-red-700 text-white px-1 py-0 text-xs rounded-lg shadow-lg hover:bg-red-800 transition cursor-pointer">Composit team .....</button>
      </Link>

      <Link href="/contact-us">
        <button className="absolute top-[5rem] left-[1215px] transform -translate-x-1/2 z-10 pointer-events-auto opacity-20 bg-red-700 text-white px-1 py-0 text-xs rounded-lg shadow-lg hover:bg-red-800 transition cursor-pointer">contact button</button>
      </Link>       */}
    </main>
  )
}

export default page
