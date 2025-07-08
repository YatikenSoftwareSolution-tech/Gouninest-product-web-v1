
import PropertiesHero from '@/components/PropertiesHero'
import PropertiesLocationTabs from '@/components/PropertiesLocationTabs'
import ScrollTransition from '@/components/ScrollTransition'
import React from 'react'

const Properties = () => {
  
  return (
     <div className="min-h-screen">
      <PropertiesHero />
      <ScrollTransition />
      <PropertiesLocationTabs />
    </div>
  )
}

export default Properties
