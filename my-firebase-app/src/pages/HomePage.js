import React from 'react'
import Navbar from '../components/Navbar'
import HomeSection from '../components/HomeSection'
import AboutSection from '../components/AboutSection'
import ServicesSection from '../components/ServicesSection'
import ContactSection from '../components/ContactSection'

const HomePage = () => {
  return (
    <>
      <Navbar />
      <HomeSection/>
      <AboutSection />
      <ServicesSection />
      <ContactSection />
    </>
  )
}

export default HomePage
