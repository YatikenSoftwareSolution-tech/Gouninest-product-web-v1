import ContactForm from '@/components/ContactForm'
import ContactsHero from '@/components/ContactsHero'
import Faqs from '@/components/Faqs'
import ScrollTransition from '@/components/ScrollTransition'
import React from 'react'

const Contacts = () => {
  return (
    <div className="min-h-screen">
     
      <ContactsHero />
      <ScrollTransition />
      <Faqs/>
      <ContactForm />
    </div>
  )
}

export default Contacts;
