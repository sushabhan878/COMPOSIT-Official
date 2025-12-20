import AdminPortalNavbar from '@/components/AdminPortalNavbar'
import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
      <AdminPortalNavbar />
      { children }
    </div>
  )
}

export default layout
