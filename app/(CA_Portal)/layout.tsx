import GridBackground from '@/components/GridBackground'
import React, { Children } from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <main>
      <GridBackground/>
      {children}
    </main>
  )
}

export default layout
