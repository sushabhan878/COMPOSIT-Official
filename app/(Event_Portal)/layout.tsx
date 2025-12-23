import GridBackground from '@/components/GridBackground'
import Navbar from '@/components/Navbar'
import React from 'react'

const layout = ({children} : {children: React.ReactNode}) => {
  return (
    <main className="min-h-screen relative">
          <GridBackground/>
      <Navbar />
      {children}
    </main>
  )
}

export default layout
