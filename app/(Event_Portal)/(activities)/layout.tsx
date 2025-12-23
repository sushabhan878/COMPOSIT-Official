import ComingSoon from '@/components/ComingSoon'
import React from 'react'

const layout = ({children} : {children: React.ReactNode}) => {
  return (
    <div>
          <ComingSoon />
          {children}
    </div>
  )
}

export default layout
