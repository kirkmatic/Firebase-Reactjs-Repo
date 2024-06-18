import React from 'react'
import Navbar from '../components/Navbar'
import HomeSection from '../components/HomeSection'
import AboutSection from '../components/AboutSection'

const HomePage = () => {
  return (
    <>
      <Navbar />
      <HomeSection/>
      <AboutSection />
        <div>
        <h1 className='text-3xl'>Home Page</h1>
        </div>
    </>
  )
}

export default HomePage
