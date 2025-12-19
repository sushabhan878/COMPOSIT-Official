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
    </main>
  )
}

export default page
