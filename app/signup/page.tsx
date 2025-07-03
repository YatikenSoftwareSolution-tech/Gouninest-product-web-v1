import React, { Suspense } from 'react'
import Signup from './Signup'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Signup />
    </Suspense>
  )
}

export default page
