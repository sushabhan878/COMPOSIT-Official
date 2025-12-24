export const dynamic = "force-dynamic";


import { auth } from '@/auth'
import GridBackground from '@/components/GridBackground'
import Navbar from '@/components/Navbar'
import React from 'react'

export default async function layout({ children }: { children: React.ReactNode }) {
    return (
    <main className="min-h-screen relative">
          <GridBackground/>
      <Navbar />
      {children}
    </main>
  )
}

