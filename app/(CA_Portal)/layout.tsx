import React, { Children } from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <main>
      {children}
    </main>
  )
}

export default layout
