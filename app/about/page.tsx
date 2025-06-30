"use client"
import AboutHero from '@/components/AboutHero';
import HowItWorks from '@/components/HowItWorks';
import Journey from '@/components/Journey';
import OurTeamSection from '@/components/OurTeam';
import ScrollTransition from '@/components/ScrollTransition';
import Testimonials from '@/components/Testimonials';
import React from 'react'
import { useRef } from 'react'

const About = () => {
  const journeyRef = useRef<HTMLElement | null>(null);

  return (
    <div className="min-h-screen">
      <AboutHero journeyRef={journeyRef} />
      <HowItWorks />
      <ScrollTransition />
      <Journey ref={journeyRef} />
      <ScrollTransition />
      <OurTeamSection />
      <Testimonials />
    </div>
  )
}

export default About;
