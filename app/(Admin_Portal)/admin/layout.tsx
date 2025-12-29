import AdminPortalNavbar from '@/components/AdminPortalNavbar'
import Footer from '@/components/Footer'
import GridBackground from '@/components/GridBackground'
import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
      <AdminPortalNavbar />
      <GridBackground/>
      {children}
    </div>
  )
}

export default layout
