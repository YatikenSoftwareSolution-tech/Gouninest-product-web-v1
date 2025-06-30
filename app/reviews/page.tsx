import ReviewsHero from '@/components/Reviews';
import ScrollTransition from '@/components/ScrollTransition';
import Testimonials from '@/components/Testimonials';
import React from 'react'

const Reviews = () => {
  return (
    <div className="min-h-screen">
      <ReviewsHero />
      <ScrollTransition />
      <Testimonials />
    </div>
  )
}

export default Reviews;
