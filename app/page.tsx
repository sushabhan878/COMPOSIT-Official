import React from 'react'
import LandingPage from '@/components/LandingPage';
import CountDown from '@/components/CountDown';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import connectDb from '@/lib/db';
import { auth } from '@/auth';

async function page() {
  return (  
    <main className='relative w-full h-screen overflow-hidden'>
      {/* Full-screen background landing page */}
      <LandingPage />
      
      
      {/* Countdown positioned in bottom right corner on desktop, center on mobile */}
      <div className='md:absolute md:bottom-5 md:right-5 fixed inset-0 flex items-center justify-center md:inset-auto z-10 pointer-events-none md:pointer-events-auto'>
        <CountDown />
      </div>
      
      <Link href="/home" className='absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/80 font-light pointer-events-auto hover:text-white transition-colors cursor-pointer'
      >
        Go to Home 
        <ArrowRight className='font-lg h-6 w-6'/>
      </Link>
    </main>
  )
}

export default page
