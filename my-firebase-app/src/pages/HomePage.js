import React from 'react'
import Navbar from '../components/Navbar'
import HomeSection from '../components/HomeSection'
import AboutSection from '../components/AboutSection'
import ServicesSection from '../components/ServicesSection'

const HomePage = () => {
  return (
    <>
      <Navbar />
      <HomeSection/>
      <AboutSection />
      <ServicesSection />
    </>
  )
}

export default HomePage
