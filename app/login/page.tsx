import React, { Suspense } from 'react'
import Login from './Login'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Login />
    </Suspense>
  )
}

export default page
