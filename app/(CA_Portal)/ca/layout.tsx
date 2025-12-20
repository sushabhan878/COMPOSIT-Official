import CaPortalNavbar from '@/components/CaPortalNavbar'
import React from 'react'

const layout = ({ children}: {children: React.ReactNode}) => {
  return (
    <div>
      <CaPortalNavbar />
      { children }
    </div>
  )
}

export default layout
