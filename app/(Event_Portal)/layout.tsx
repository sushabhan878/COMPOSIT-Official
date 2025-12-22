import GridBackground from '@/components/GridBackground'
import Navbar from '@/components/Navbar'
import React from 'react'

const layout = ({children} : {children: React.ReactNode}) => {
  return (
    <main className="min-h-screen relative">
          <GridBackground/>
          <Navbar />
          <div className="flex items-center justify-center min-h-screen">
              <div className="text-center px-6">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 bg-gradient-to-r from-white via-white to-[#5c0a0a] bg-clip-text text-transparent animate-pulse">
                  Website is under Construction
                </h1>
                <p className="text-xl md:text-2xl text-white/70 font-light">
                  Stay tuned!
                </p>
                <div className="mt-8 w-64 h-1 mx-auto bg-gradient-to-r from-transparent via-[#5c0a0a] to-transparent rounded-full shadow-[0_0_20px_rgba(92,10,10,0.5)]" />
              </div>
      </div>
      {children}
    </main>
  )
}

export default layout
