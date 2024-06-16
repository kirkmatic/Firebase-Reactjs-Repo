import React from 'react'
import Navbar from '../components/Navbar'
import HomeSection from '../components/HomeSection'

const HomePage = () => {
  return (
    <>
      <Navbar />
      <HomeSection/>
        <div>
        <h1 className='text-3xl'>Home Page</h1>
        </div>
    </>
  )
}

export default HomePage
