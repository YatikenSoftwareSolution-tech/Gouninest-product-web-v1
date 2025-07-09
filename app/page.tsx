import ChooseUs from '@/components/ChooseUs'
import FeaturedBlogs from '@/components/FeaturedBlogs'
import Hero from '@/components/Hero'
import LocationTabs from '@/components/LocationTabs'
import PropertyTabs from '@/components/PropertyTabs'
import ScrollTransition from '@/components/ScrollTransition'
import Testimonials from '@/components/Testimonials'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Hero />
      <ScrollTransition />
      <LocationTabs />
      <PropertyTabs />
      <ChooseUs />
      <FeaturedBlogs/>
      <ScrollTransition />
      <Testimonials />

    </div>
  )
}

export default Home
